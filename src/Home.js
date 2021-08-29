import React from 'react';
import './css/Home.css'

const Home = () => {
    return (
        <div className="home">
            <div className="apresentacao">
                <h1>ESTUDANDO?</h1>
                <h1>PRECISA MEMORIZAR COM</h1>
                <h1>QUALIDADE?</h1>
                <p className="descricao">
                    Flash cards é uma técnica ou ferramenta de memorização que transformamos em um sistema, que vai ajudar a você a guardar seus conteúdo
                    de estudo para revisar de qualquer lugar e ajudar a você memorizar esta informação na sua memória de longo prazo.
                </p>
            </div>
            <div className="demonstracao">
                <div className="board">
                    <div className="card card-blue">
                        Escreva sua pergunta aqui?
                    </div>
                    <div className="card card-yellow">
                        Escreva sua resposta aqui
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;