const saveItem = (item) => localStorage.setItem('cart', JSON.stringify(item));

const getItem = () => JSON.parse(localStorage.getItem('cart'));

export { saveItem, getItem };
