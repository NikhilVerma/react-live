import React, { Component } from 'react';

const errorBoundary = (Element, errorCallback) => {
  return class ErrorBoundary extends React.Component {
      static originalElement = Element

    componentDidCatch(error) {
      errorCallback(error);
    }

    render() {
      return typeof Element === 'function' ?
        <Element/> :
        Element;
    }
  }
}

export default errorBoundary
