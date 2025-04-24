import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCryptoAssets } from '../store/cryptoSlice';
import { styled } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import websocketService from '../services/websocketService';
import { setSortOption } from '../store/filterSlice';
import mockWebSocket from '../services/mockWebSocket';

const StyledTableCell = styled(TableCell)(({ theme, change }) => ({
  [`&.${TableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${TableCellClasses.body}`]: {
    fontSize: 14,
    color: change > 0 ? 'green' : change < 0 ? 'red' : 'inherit',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TableCellClasses = {
  head: 'MuiTableCell-head',
  body: 'MuiTableCell-body',
};

const CryptoTable = () => {
  const assets = useSelector(selectCryptoAssets);
  const sortOption = useSelector(state => state.filter.sortOption);
  const dispatch = useDispatch();

  useEffect(() => {
    websocketService.connect();
    // mockWebSocket.connect();

    return () => {
      websocketService.disconnect();
      // mockWebSocket.disconnect();
    };
  }, []);

  const handleSortChange = (event) => {
    dispatch(setSortOption(event.target.value));
  };

  const sortedAssets = React.useMemo(() => {
    let sorted = [...assets];
    switch (sortOption) {
      case 'top_gainers_1h':
        sorted.sort((a, b) => (b.change1h || 0) - (a.change1h || 0));
        break;
      case 'top_losers_1h':
        sorted.sort((a, b) => (a.change1h || 0) - (b.change1h || 0));
        break;
      case 'top_gainers_24h':
        sorted.sort((a, b) => (b.change24h || 0) - (a.change24h || 0));
        break;
      case 'top_losers_24h':
        sorted.sort((a, b) => (a.change24h || 0) - (b.change24h || 0));
        break;
      case 'market_cap_desc':
        sorted.sort((a, b) => (b.marketCap || 0) - (a.marketCap || 0));
        break;
      case 'market_cap_asc':
        sorted.sort((a, b) => (a.marketCap || 0) - (b.marketCap || 0));
        break;
      case 'volume_desc':
        sorted.sort((a, b) => (b.volume24h || 0) - (a.volume24h || 0));
        break;
      case 'volume_asc':
        sorted.sort((a, b) => (a.volume24h || 0) - (b.volume24h || 0));
        break;
      case 'max_supply_desc':
        sorted.sort((a, b) => (b.maxSupply || -1) - (a.maxSupply || -1));
        break;
      case 'max_supply_asc':
        sorted.sort((a, b) => (a.maxSupply || -1) - (b.maxSupply || -1));
        break;
      default: // 'default' or ''
        break;
    }
    return sorted;
  }, [assets, sortOption]);

  return (
    <Box>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="sort-by-label">Sort By</InputLabel>
        <Select
          labelId="sort-by-label"
          id="sort-by"
          value={sortOption}
          label="Sort By"
          onChange={handleSortChange}
        >
          <MenuItem value="">Default</MenuItem>
          <MenuItem value="top_gainers_1h">Top Gainers (1h)</MenuItem>
          <MenuItem value="top_losers_1h">Top Losers (1h)</MenuItem>
          <MenuItem value="top_gainers_24h">Top Gainers (24h)</MenuItem>
          <MenuItem value="top_losers_24h">Top Losers (24h)</MenuItem>
          <MenuItem value="market_cap_desc">Market Cap (High to Low)</MenuItem>
          <MenuItem value="market_cap_asc">Market Cap (Low to High)</MenuItem>
          <MenuItem value="volume_desc">Volume (24h High to Low)</MenuItem>
          <MenuItem value="volume_asc">Volume (24h Low to High)</MenuItem>
          <MenuItem value="max_supply_desc">Max Supply (High to Low)</MenuItem>
          <MenuItem value="max_supply_asc">Max Supply (Low to High)</MenuItem>
        </Select>
      </FormControl>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 850 }} aria-label="crypto table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">1h %</StyledTableCell>
              <StyledTableCell align="right">24h %</StyledTableCell>
              <StyledTableCell align="right">7d %</StyledTableCell>
              <StyledTableCell align="right">Market Cap</StyledTableCell>
              <StyledTableCell align="right">Volume (24h)</StyledTableCell>
              <StyledTableCell align="right">Circulating Supply</StyledTableCell>
              <StyledTableCell align="right">Max Supply</StyledTableCell>
              <StyledTableCell align="right">Last 7 Days</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedAssets.map((asset, index) => (
              <StyledTableRow key={asset.id}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <img src={asset.logo} alt={asset.name} style={{ width: 24 }} />
                    <Typography variant="subtitle2" fontWeight="bold">{asset.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{asset.symbol}</Typography>
                  </Stack>
                </TableCell>
                <StyledTableCell align="right">{asset.price ? `$${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ''}</StyledTableCell>
                <StyledTableCell align="right" change={asset.change1h}>
                  {asset.change1h !== undefined ? `${asset.change1h.toFixed(2)}%` : ''}
                </StyledTableCell>
                <StyledTableCell align="right" change={asset.change24h}>
                  {asset.change24h !== undefined ? `${asset.change24h.toFixed(2)}%` : ''}
                </StyledTableCell>
                <StyledTableCell align="right" change={asset.change7d}>
                  {asset.change7d !== undefined ? `${asset.change7d.toFixed(2)}%` : ''}
                </StyledTableCell>
                <StyledTableCell align="right">{asset.marketCap ? `$${asset.marketCap.toLocaleString()}` : ''}</StyledTableCell>
                <StyledTableCell align="right">{asset.volume24h ? `$${asset.volume24h.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : ''}</StyledTableCell>
                <StyledTableCell align="right">
                  {asset.circulatingSupply ? `${asset.circulatingSupply.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${asset.symbol}` : ''}
                </StyledTableCell>
                <StyledTableCell align="right">{asset.maxSupply ? asset.maxSupply.toLocaleString() : '∞'}</StyledTableCell>
                <TableCell align="right">
                  <Box sx={{ height: 40, width: 100 }}>
                    <Line
                      data={{
                        labels: asset.sparklineData?.labels,
                        datasets: [
                          {
                            ...asset.sparklineData?.datasets?.[0],
                            borderColor: '#47b885',
                            borderWidth: 2, // Increased line width here
                          },
                        ],
                      }}
                      options={{
                        plugins: { legend: { display: false } },
                        scales: {
                          x: { display: false },
                          y: { display: false },
                        },
                        elements: { point: { radius: 0 } },
                        maintainAspectRatio: false,
                      }}
                    />
                  </Box>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CryptoTable;