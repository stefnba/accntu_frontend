

function parseAmount(a, currency = null, decimals = 2) {
    let amount = parseFloat(a);

    if (Number.isInteger(amount)) {
        amount = parseInt(amount, 10);
    }

    if (currency) {
        return amount.toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
            style: 'currency',
            currency,
            currencyDisplay: 'symbol',
        });
    }

    // return amount;
    return amount.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
}


const amountHelpers = {
    parseAmount,
};


export default amountHelpers;
