// Про npx и npm. 
// npx - отвечает за установку и запуск js программ с дальгнейшим их автоматическим удалением после завершения работы с программой.
// npm - отвечает за установку любых библиотек в наш проект.

// -----------------------------------Redux Toolkit------------------------------------------------------------------------------------------
// Redux Toolkit - сама библиотека redux, устанавливается командой npm install @reduxjs/toolkit
// React Redux - нужен для того, чтобы подружить React и Redux, устанавливается с помощью npm install react-redux
// Но обычно в реакт устанавливают все сразу с помощью команды: npm install @reduxjs/toolkit react-redux
// -------------------------------------------------------------------------------------------------------------------------------------------

// ==========================================================================================================================================
// В JS можно узнать адрес страницы на которой ты находишься. Для этого нужно написать в консоли в браузере window.location.pathname
// Ниже пример создания простого роутинга на обычном JS
// function bla() {
//   const pathname = window.location.pathname
//   if(pathname === '/') {
//     return <Home />
//   } else if (pathname !== '/') {
//     return <NotFound />
//   }
// }
// ==========================================================================================================================================

import React from 'react';
import {Routes, Route} from 'react-router-dom'


import Header from './components/Header'
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import './scss/app.scss';

// ------------------------------------------------------------- Порядок действий при создании Контекста React.createContext('') ---------------------------------------------------

// 1. Создаем снаружи компонента App и сразу экспортируем глобальную константу с нужным именем: export const SearchContext = React.createContext('')
// 2. Создаем внутри компонента App константу с состоянием: const [searchValue, setSearchValue] = React.useState('')
// 3. Оборачиваем все наши теги в компонент <SearchContext.Provider></SearchContext.Provider>
// 4. В компоненте SearchContext.Provider создаем свойство value, в него передаем объект с переменными из ранее 
// созданного состояния:  <SearchContext.Provider value={{searchValue, setSearchValue}}>
// 5. В нужном файле импортируем наше состояние: import { SearchContext } from '../../App'
// 6. Используем хук useContext(SearchContext), куда передаем название глобальной константы 'SearchContext' и производим деструктуризацию,
// чтобы вытащить переменные из value: const {searchValue, setSearchValue} = React.useContext(SearchContext)
// 7. Пользуемся контекстом :)

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


export const SearchContext = React.createContext('')  // Это как использовать глобальную переменную, доступную везде в проекте. 
                                                      // При создании контекста сама константа НЕ является компонентом, она является объектом, содержащим 
                                                      // в себе разные значения, одним из которых является Provider. Provider уже является компонентом. 
                                                      // По этому для использования контекста как компонента нужно прописать само название константы
                                                      // контекста и чеерез точку вызвать компонент Provider. Т.е. в данном случае: SearchContext.Provider
                                                      // Незабываем сделать export нашей константы, для того, чтобы в дальнейшем ее импортироватиь в нужный фаил


function App() {
  const [searchValue, setSearchValue] = React.useState('') // С помощью useState создаем наши премннные, а с помощью React.createContext('') создаем глобальную 
                                                           // переменную SearchContext, далее оборачиваем все преиложение в наш контекст с помощью компонента SearchContext.Provider
                                                           // и в его value передаем наши переменные из useState. Теперь они доступны во всем приложении при 
                                                           // использовании хука React.useContext() и передачи внутрь него 'SearchContext' нашей глобальной переменной
                                                           // Пример: React.useContext(SearchContext). Далее из нашей глобальной переменной вытаскиваем переменные,
                                                           // созданные в React.useState и положенные в value нашей глобальной переменной. 
                                                           // Пример: const {searchValue, setSearchValue} = React.useContext(SearchContext)
                                                           // Не забываем сделать export нашей глобальной переменной

  return (
    <SearchContext.Provider value={{searchValue, setSearchValue}}>
      <div className="wrapper">
          <Header />

          <div className="content">
              <div className="container">
                <Routes>
                  <Route path="/" element={<Home />}/>
                  <Route path="*" element={<NotFound />}/>
                  <Route path="/cart" element={<Cart />}/>
                </Routes>
              </div>
          </div>
      </div>
    </SearchContext.Provider>
  )
}

export default App;
