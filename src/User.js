import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/User.css';
import { getUser, resetSession,getToken } from './service/AuthService'
import { getCustomRequestHeader } from './service/RequestService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

const categoriesUrl = 'https://e0rcnwe8uc.execute-api.sa-east-1.amazonaws.com/dev/categories'
const quastionsUrl = 'https://e0rcnwe8uc.execute-api.sa-east-1.amazonaws.com/dev/cards?id_category='

const User = (props) => {
    const user = getUser();
    const token = getToken();
    const [ customRequest, setCustomRequest ] = useState(getCustomRequestHeader('token', token));
    const [ name, setName ] = useState(user !== 'undefined' && user ? user : '');
    const [ categories, setCategories ] = useState([]);
    const [ cards, setCards ] = useState([]);
    const [ newCardCategory, setNewCardCategory ] = useState(false);
    const [ newCardQuestion, setNewCardQuestion ] = useState(false);
    const [ question, setQuestion ] = useState('');
    const [ answear, setAnswear ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ categoryTitle, setCategoryTitle ] = useState('');

    const handleLogout = () => {
        resetSession();
        props.history.push('login')
    }

    const handleAddCard = () => {

    }

    const handleAddCardCategory = () => {

    }

    const handleReturn = () => {
      setCards([])
      handleCancelQuestion();
      searchCategories();
    }

    const handleCancelQuestion = () => {
      setNewCardQuestion(false);
      setAnswear('')
      setQuestion('')
    }

    const handleCancelCategory = () => {
      setNewCardCategory(false);
      setCategory('')
    }

    const handlerQuestions = (category) => {
      if (categories) {
        axios.get(quastionsUrl+category.id_category, customRequest).then(response => {
          setCards(response.data)
          setCategories([])
          setCategoryTitle(category.category_name)
          console.log("buscou as questoes")
        }).catch(() => {
          console.log("nao buscou as questoes")
        })
      }
    }

    const categoryElement = (category) => {
      return <div id={category.id_category} className="category-element" onClick={() => handlerQuestions(category)}>
        {category.category_name.toUpperCase()}
      </div>
    }

    const cardElement = (card) => {
      return <div className="category-element">{card.question}</div>
    }

    const searchCategories = () => {
      axios.get(categoriesUrl, customRequest).then(response => {
        setCategories(response.data)
      }).catch(() => {
        console.log("nao buscou as categorias")
      })
    }

    useEffect(() => {
      setCategories([]);
      setCards([]);
      searchCategories();
      }, [setNewCardCategory, setNewCardQuestion]);

    return (
        <div className="user">
            {categories.length > 0 && 
              <div>
                <h2>Categorias</h2>
                <FontAwesomeIcon className="awesome-color" title="Acionar cartão de categoria" icon={faPlusCircle} onClick={() => setNewCardCategory(true)} />
              </div>
            }
            {newCardCategory && <div>
                <fieldset>
                  <legend>Nova categoria</legend>
                  Categoria: <input type="text" name="question" className="input-cards" value={category} onChange={(e) => setCategory(e.value)} />
                  <br/>
                  <input type="submit" name="cancelar" value="Cancelar" className="input-submit input-submit-cancel" onClick={handleCancelCategory}/>
                  <input type="submit" name="adicionar" value="Adicionar" className="input-submit input-submit-agree" conClick={handleAddCardCategory}/>
                </fieldset>
              </div>
            }
            {!newCardCategory && categories.length > 0 && <div>{ categories.map(categoryElement)}</div>}

            {cards.length > 0 && 
              <div>
                <h2>Questões \ {categoryTitle}</h2>
                <FontAwesomeIcon className="awesome-color" title="Voltar" icon={faArrowAltCircleLeft} onClick={handleReturn} />
                <FontAwesomeIcon className="awesome-color" title="Acionar cartão de questão" icon={faPlusCircle} onClick={() => setNewCardQuestion(true)} />
              </div>
            }
            {newCardQuestion && <div>
                <fieldset>
                  <legend>Novo cartão</legend>
                  Pergunta: <input type="text" name="question" className="input-cards" value={question} onChange={(e) => setQuestion(e.value)} />
                  <br/>
                  Resposta: <input type="text" name="answear" className="input-cards" value={answear} onChange={(e) => setAnswear(e.value)} />
                  <br/>
                  <input type="submit" name="cancelar" value="Cancelar" className="input-submit input-submit-cancel" onClick={handleCancelQuestion}/>
                  <input type="submit" name="adicionar" value="Adicionar" className="input-submit input-submit-agree" conClick={handleAddCard}/>
                </fieldset>
              </div>
            }
            {!newCardQuestion && cards.length > 0 && <div>{cards.map(cardElement)}</div>}
        </div>
    )
}

export default User;