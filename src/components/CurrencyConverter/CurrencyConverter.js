import { useEffect, useState } from "react";
import axios from "axios";
import ExchangeRate from "../ExchangeRate/ExchangeRate";

const CurrencyConverter = () => {
  const currencies = ["BTC", "ETH", "USD", "XRP", "LTC", "ADA", 'RUB'];
  const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState("BTC");
  const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [result, setResult] = useState(0);

  //   console.log(chosenPrimaryCurrency);
  //   console.log(chosenSecondaryCurrency);
  //   console.log(amount);

  const convert = () => {
    const options = {
      method: "GET",
      url: "https://alpha-vantage.p.rapidapi.com/query",
      params: {
        from_currency: chosenPrimaryCurrency,
        function: "CURRENCY_EXCHANGE_RATE",
        to_currency: chosenSecondaryCurrency,
      },
      headers: {
        "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
        "x-rapidapi-key": "6bd18638c3msh29830a13c89e1e2p102e49jsndb17686fe719",
      },
    };

    axios
      .request(options)
      .then((response) => {
        // console.log(response.data);
        let exchangeRate =response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
        setExchangeRate(exchangeRate);
        setResult(exchangeRate * amount);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //   console.log(exchangeRate);

  return (
    <div className="currency-converter">
      <h2>CurrencyConverter</h2>
      <div className="input-box">
        <table>
          <tbody>
            <tr>
              <td>Primary Currency:</td>
              <td>
                <input
                  type="number"
                  name="currency-amount-1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </td>
              <td>
                <select
                  name="currency-option-1"
                  value={chosenPrimaryCurrency}
                  className="currency-options"
                  onChange={(event) =>
                    setChosenPrimaryCurrency(event.target.value)
                  }
                >
                  {currencies.map((currency, _index) => (
                    <option key={_index}>{currency}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>Secondary Currency:</td>
              <td>
                <input
                  type="number"
                  name="currency-amount-2"
                  value={result}
                  disabled={true}
                />
              </td>
              <td>
                <select
                  name="currency-option-2"
                  value={chosenSecondaryCurrency}
                  className="currency-options"
                  onChange={(event) =>
                    setChosenSecondaryCurrency(event.target.value)
                  }
                >
                  {currencies.map((currency, _index) => (
                    <option key={_index}>{currency}</option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <button id="convert-button" onClick={convert}>
          Convert
        </button>
      </div>

      <ExchangeRate />
    </div>
  );
};

export default CurrencyConverter;