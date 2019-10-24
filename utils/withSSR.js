import React, { useEffect, useState } from 'react'
import withStyles from 'isomorphic-style-loader/withStyles';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { useStore } from 'react-redux'
export default function withSSR(style) {
  return function (Component) {
    const ParentComponent = function (props) {
      const { match } = props;
      const [childProps, setChildProps] = useState({})
      const getInitialProps = Component.getInitialProps;
      const store = useStore()
      const load = async () => {
        const newChildProps = await getInitialProps(store);
        setChildProps(newChildProps)
      }
      useEffect(() => {
        console.log(window._serverRouter, match.path)
        if (window._serverRouter !== match.path) {
          console.log('load data ajax')
          load();
        }
      }, []);
      return <Component {...props} {...childProps} />
    }
    // 将Component的static方法复制到高级组件上，这也服务端才能读取到getInitialProps
    const withStatics = hoistNonReactStatics(ParentComponent, Component)
    return style ? withStyles(style)(withStatics) : withStatics
  }
}