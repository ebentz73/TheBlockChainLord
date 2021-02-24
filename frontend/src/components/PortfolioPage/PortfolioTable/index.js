import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function createData(
  logo,
  name,
  net,
  quantity,
  costAvg,
  percent_change_24h,
  percent_change_7d,
  history
) {
  return {
    logo,
    name,
    net,
    quantity,
    costAvg,
    percent_change_24h,
    percent_change_7d,
    history,
  };
}
const handlePortfolioRowClick = (e) => {
  alert("rowclicked");
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <img className="logo-img" alt="logo" src={row.logo}></img>
          {row.name}
        </TableCell>
        <TableCell align="right">{row.net}</TableCell>
        <TableCell align="right">{row.quantity}</TableCell>
        <TableCell align="right">{row.costAvg}</TableCell>
        <TableCell align="right">{row.percent_change_24h}</TableCell>
        <TableCell align="right">{row.percent_change_7d}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell align="right">Purchase Price</TableCell>
                    <TableCell align="right">Total Cost ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {Date(historyRow.date)}
                      </TableCell>
                      <TableCell>{historyRow.quantity}</TableCell>
                      <TableCell align="right">
                        {historyRow.purchasePrice}
                      </TableCell>
                      <TableCell align="right">
                        {historyRow.quantity * historyRow.purchasePrice}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
//   createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
//   createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
//   createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
// ];

export default function PortfolioTable() {
  const dispatch = useDispatch();
  const assets = useSelector((state) => state.assets);
  const portfolio = useSelector((state) => state.portfolio);

  const rows = Object.values(portfolio).map((asset) => {
    const logo = assets[asset.id].assetDetails.logo;
    const name = assets[asset.id].name + " " + asset.symbol;
    const currentPrice = assets[asset.id].quote.USD.price;
    const net =
      currentPrice * asset.quantityOfAsset -
      asset.costAvg * asset.quantityOfAsset;
    const percent_change_24h = assets[asset.id].quote.USD.percent_change_24h;
    const percent_change_7d = assets[asset.id].quote.USD.percent_change_7d;

    return createData(
      logo,
      name,
      net,
      asset.quantityOfAsset,
      asset.costAvg,
      percent_change_24h,
      percent_change_7d,
      asset.history
    );
  });
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Asset Name/Symbol</TableCell>
            <TableCell align="right">Net Profit/Loss</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Cost Average</TableCell>
            <TableCell align="right">Gains/Losses 24h</TableCell>
            <TableCell align="right">Gains/Losses 7d</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}