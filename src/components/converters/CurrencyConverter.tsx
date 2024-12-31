import React, { useState, useEffect } from 'react';
import { fetchExchangeRates, convertCurrency } from '../../utils/currencyConverter';
import BaseConverter from './BaseConverter';

const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR'];

export default function CurrencyConverter() {
  const [value, setValue] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [rates, setRates] = useState<Record<string, number>>({});
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExchangeRates()
      .then(setRates)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading && value) {
      try {
        const converted = convertCurrency(
          parseFloat(value),
          fromCurrency,
          toCurrency,
          rates
        );
        setResult(converted.toFixed(2));
      } catch (error) {
        setResult('Error');
      }
    }
  }, [value, fromCurrency, toCurrency, rates, loading]);

  if (loading) {
    return <div className="p-4">Loading exchange rates...</div>;
  }

  return (
    <BaseConverter
      value={value}
      fromUnit={fromCurrency}
      toUnit={toCurrency}
      units={currencies}
      result={result}
      onValueChange={setValue}
      onFromUnitChange={setFromCurrency}
      onToUnitChange={setToCurrency}
    />
  );
}