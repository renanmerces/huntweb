import React, {Component} from 'react'
import api from '../../services/api'

import './style.css'

export default class Main extends Component {

    constructor(props){
        super(props)
        this.state = {
            products: [],
            productInfo: {},
            page: 1
        }
    }

    componentDidMount(){
        this.loadProducts()
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`)
        console.log(response.data)

        const {docs, ...productInfo} = response.data

        this.setState({products: docs, productInfo, page})
    }

    nexPage = () => {

        const {page, productInfo} = this.state

        if(page === productInfo.pages) return

        this.loadProducts(page + 1)

    }

    prevPage = () => {
        const {page} = this.state

        if(page === 1) return

        this.loadProducts(page - 1)
    }

    render(){
        const { products, productInfo, page } = this.state

        return(
            <div className="product-list">
                {products.map(product => (
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>
                        <a href="#">Acessar</a>
                    </article>
                ))}
                <div className="actions">
                    <button onClick={this.prevPage}>Anterior</button>
                    <button onClick={this.nexPage}>Próxima</button>
                </div>
            </div>
        )
    }
}