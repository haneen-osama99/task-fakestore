const getProductCategory = async () =>{
    const urlParams = new URLSearchParams(window.location.search);
    const categoryName = urlParams.get('category');
    const {data} = await axios.get(`https://fakestoreapi.com/products/category/${categoryName}`);
    return data;
}

const displayProductCategory = async () =>{
    try{
    const product = await getProductCategory();
    const result = product.map((product) =>{
        return `
            <div class="product">
                <img src=${product.image} class="productImage"/>
                <p class ="productTitle">${product.title} <span class="price">${product.price}$</span>
                </p>
                <a class="detailsBtn" href="./productDetails.html?productId=${product.id}">details</a>
            </div>
        `
    }).join('');
        document.querySelector('.productCategory .row').innerHTML = result;
    }catch(error){
        document.querySelector('.productDetails .row').innerHTML = "<p>Please try agin please</p>"
    }finally{
        document.querySelector('.loading').classList.add('d-none');
    }
}
displayProductCategory();

