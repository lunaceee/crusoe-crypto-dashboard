import Table from './components/Table'
import React, { useMemo, useState } from "react"
import { useInterval } from "./hooks/useInterval"
import Loader from "./components/Loader"

const App = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  async function getData() {
    setIsError(false);
    let response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")

    if (!response.ok) {
      setIsError(true);
    } else {
      return await response.json()
    }
  }

  // Refetch data every 5 seconds
  useInterval(() => {
    getData().then(list => {
      setData(list)
      setIsLoading(false);
    }).catch(
      e => console.log(e)
    )
  }, [5000])

  const columns = useMemo(
    () => [
      {
        Header: '#',
        accessor: (name, index) => index + 1,
      },
      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ value, row }) => {
          return (
            value !== null ?
            <div className="flex items-center justify-start">
              <img src={row.original.image} alt="logo" className="w-8 pr-2" />
              <p>{value}</p>
            </div> : "N/A"
          )
        }
      },
      {
        Header: 'Current Price',
        accessor: "current_price",
        Cell: ({ value }) => {
          return value !== null ? `$${value.toLocaleString()}` : "N/A"
        }
      },
      {
        Header: 'Market Cap',
        id: 'marketCap1',
        accessor: 'market_cap',
        Cell: ({ value }) => {
          return value !== null ? `$${value.toLocaleString()}` : "N/A"
        },
      },
      {
        Header: 'Total Volume',
        accessor: 'total_volume',
        Cell: ({ value }) => {
          return value !== null ? `$${value.toLocaleString()}` : "N/A"
        },
      },
      {
        Header: 'Price Change Percentage 24h',
        accessor: 'price_change_percentage_24h',
        Cell: ({ value }) => {
          return value !== null ?
            <div className={`flex items-center gap-2 ${value > 0 ? "text-green-500" : "text-red-500"}`}>
              {value > 0 ? <svg width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
              </svg> : <svg width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                  <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>}
              {value.toFixed(2)}%
            </div> : "N/A"
        }
      },
      {
        Header: 'Circulating Supply',
        accessor: 'circulating_supply',
        Cell: ({ value }) => {
          return value !== null ? `$${value.toLocaleString()}` : "N/A";
        }
      },
      {
        Header: "# of Days since all-time high",
        accessor: (ath_date) => {
          return ath_date !== null ? 99999999999999 - Date.parse(ath_date.ath_date) : "N/A" //Force sorting by the reverse order by substracting from a timestamp that's larger than reasonably possible 
        },
        Cell: ({ row }) => {
          const athDate = Date.parse(row.original.ath_date)
          const diffInTime = Date.now() - athDate
          const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24))
          return diffInDays
        }
      },
      {
        Header: "Total Market Share",
        id: 'marketCap2',
        accessor: 'market_cap',
        Cell: ({ value }) => {
          if (value === null) {
            return "N/A"
          } else {
            const arr = data.map(mc => mc.market_cap)
            const reducer = (acc, currentValue) => acc + currentValue;
            let total = arr.reduce(reducer, 0)
            return `${((value / total) * 100).toFixed(2)}%`
          }
        },
      }], [data])

  return (
    <div className="container mx-auto">
      <header className="text-center text-3xl p-8">
        <h1>Crusoe Crypto</h1>
      </header>
      {isError && <h2 className="text-center text-2xl p-8">Something went wrong ...</h2>}
      {isLoading ? <Loader /> : <Table columns={columns} data={data} />}
      <footer className="flex items-center justify-center p-4 h-40">
        <h2>Built with ♥︎ in React</h2>
      </footer>
    </div>
  );
}

export default App;
