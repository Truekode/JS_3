const backetCount = document.querySelector('.cartIconWrap > span');
const basketTotalValue = document.querySelector('.basketTotalValue');
const basket = document.querySelector('.basket');

document.querySelector('.cartIconWrap').addEventListener('click', () => {
    basket.classList.toggle('hidden');
});

const basketObject = {};

document.querySelector('.featuredItems').addEventListener('click', ({target}) => {
    if (!target.closest('.addToCard')) {
        return;
    }
    const featuredItem = target.closest('.featuredItem');
    addToCard(+featuredItem.dataset.id, featuredItem.dataset.name, +featuredItem.dataset.price);
})

function addToCard(id, name, price) {
    if (!(id in basketObject)){
        basketObject[id] = {
            id,
            name,
            price,
            count: 0,
        }
    }
    basketObject[id].count++;
    backetCount.textContent = getTotalBasketCount();
    basketTotalValue.textContent = getTotalBasketPrice();
    renderProductInBasket(id);
}

function getTotalBasketCount() {
    return Object.values(basketObject).reduce((count, product) => count + product.count, 0);
}

function getTotalBasketPrice() {
    return Object.values(basketObject).reduce((price, product) => price + product.price * product.count, 0);
}

function renderProductInBasket(id) {
    const basketRow = basket.querySelector(`.basketRow[data-productId="${id}"]`);
    if (!basketRow) {
        return renderProduct(id);
    }
    basketRow.querySelector('.productCount').textContent = basketObject[id].count;
    basketRow.querySelector('.productTotalRow').textContent = basketObject[id].count * basketObject[id].price;
}

function renderProduct(productId) {
    const productHtml = `
    <div class="basketRow" data-productId="${productId}">
        <div>${basketObject[productId].name}</div>
        <div>
            <span class="productCount">${basketObject[productId].count}</span> шт.
        </div>
        <div>$${basketObject[productId].price}</div>
        <div>
            $<span class="productTotalRow">${(basketObject[productId].count * basketObject[productId].price)}</span> шт.
        </div>
    </div>`;
    document.querySelector('.basketTotal').insertAdjacentHTML('beforebegin', productHtml);
}