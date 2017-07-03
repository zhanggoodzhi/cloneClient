import * as React from 'react';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { CommomComponentProps } from 'models/component';
import { Layout, Breadcrumb } from 'antd';
import * as style from './style.less';

const { Header, Content, Footer } = Layout;

interface MinorLayoutProps { };

interface MinorLayoutState { };

class MinorLayout extends React.Component<CommomComponentProps<MinorLayoutProps, MinorLayoutState>, MinorLayoutState> {
  public render(): JSX.Element {
    return (
      <Layout>
        <Header className={style.Header}>
          <Link to="/"><span className={style.LogoText}>jintong soft</span></Link>
        </Header>
        <Content>
          <div className={style.Container}>
            {renderRoutes(this.props.route.routes)}
          </div>
        </Content>
      </Layout>
    );
  }
}


export default MinorLayout;
