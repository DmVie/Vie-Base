import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from "history"

// User Components
import ArticlePage from '../components/ArticlePage';
import ArticlesPage from '../components/ArticlesPage';
import ContactPage from '../components/ContactPage';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HeaderBar from '../components/HeaderBar';
import HomePage from '../components/HomePage';
import LearningPage from '../components/LearningPage';
import LearningsPage from '../components/LearningsPage';
import PageContent from '../components/PageContent';
import PageNotFound from '../components/PageNotFound';
import ProjectPage from '../components/ProjectPage';
import ProjectsPage from '../components/ProjectsPage';


const AppRouter = () => {

  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <Header />
      <HeaderBar />
      <PageContent>
        <Switch>
          <Route path="/" component={HomePage} exact={true}/>
          <Route path="/projects/:id" component={ProjectPage} exact={true}/>
          <Route path="/projects" component={ProjectsPage}/>
          <Route path="/articles/:id" component={ArticlePage}/>
          <Route path="/articles" component={ArticlesPage} />
          <Route path="/learnings/:id" component={LearningPage}/>
          <Route path="/learnings" component={LearningsPage} />
          <Route path="/contact" component={ContactPage}/> 
          <Route component={PageNotFound} />
        </Switch>
      </PageContent>
      <Footer />
    </Router>
  )

}


export default AppRouter;