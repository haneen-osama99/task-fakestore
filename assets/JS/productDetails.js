const getProduct = async () =>{
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    const {data} = await axios.get(`https://fakestoreapi.com/products/${productId}`);
    // console.log(data)
    return data;
}
const displayProduct = async () =>{
    try{
    const productData = await getProduct();
    let data = "";
        data += `
        <div class="productImage">
            <img src='${productData.image}' />
        </div>  
        <div class="productData">
            <h1 class="productTitle">${productData.title}</h1>
            <h2>${productData.category}</h2>
            <p  class="productDescription">${productData.description}</p>
            <p class="price">${productData.price}</p>
        </div>
        `
        document.querySelector('.productDetails .row').innerHTML = data;
    }catch (error){
        document.querySelector('.productDetails .row').innerHTML = "<p>Please try agin please</p>"
    }finally{
        document.querySelector('.loading').classList.add('d-none')

    }
}
displayProduct();