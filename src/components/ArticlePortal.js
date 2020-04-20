import React from 'react';
import ReactDOM from 'react-dom';

export default class ArticlePortal extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div');
    this.el.id = 'banner';
  }


  componentDidMount() {
    document.getElementById('root').insertBefore(this.el, document.querySelector('footer'))
    
  }


  render() {
      return ReactDOM.createPortal(this.props.children, this.el)
  }
}
