// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'

import DemoLayout from './layouts/DemoLayout/DemoLayout'
import AuctionPage from './pages/AuctionPage/AuctionPage'
import ChatPage from './pages/ChatPage/ChatPage'
import CountdownPage from './pages/CountdownPage/CountdownPage'

const Routes = () => {
  return (
    <Router>
      <Set wrap={DemoLayout}>
        <Route path="/chat" page={ChatPage} name="chat" />
        <Route path="/countdown" page={CountdownPage} name="countdown" />
        <Route path="/auction/{id}" page={AuctionPage} name="auction" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
