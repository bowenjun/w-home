import { useState } from 'react';
import { Layout, Row, Col, Card, Avatar } from 'antd';
import { GithubOutlined, EllipsisOutlined, DingdingOutlined } from '@ant-design/icons';
import types from './types.json';
import products from './products.json';

import './App.less';

let typesObj = {};
for (let i of types) {
  typesObj[i.routerUrl] = i;
}

function App() {
  const [active, setActive] = useState(() => 'all');
  const activeObj = { ...typesObj[active] };
  return (
    <Layout className="main">
      <header className="header">
        <div className="wrap">
          <div className="child">
            <div className="svg_block image1" />
            <div className="svg_diamond image2" />
            <div className="svg_leaf image3" />
            <div className="svg_small_circle" />
            <div className="svg_big_circle" />
            <div className="svg_triangle image4" />
          </div>
        </div>
        <article className="message">
          <div>
            <h3>{activeObj.introTitle}</h3>
            <p>{activeObj.intro}</p>
          </div>
        </article>
      </header>
      <Layout.Content className="body">
        <div className="items">
          <Row >
            {
              types.map((item) => {
                return (
                  <Col xs={12} sm={6} md={3} key={item.routerUrl}>
                    <div className="navitem">
                      <a onClick={() => setActive(item.routerUrl)} className={active === item.routerUrl ? 'active' : ''}>
                        <i className={`navicon ${item.navIcon}`} />
                        <span className="navtext">{item.navText}</span>
                        <div className="navbot" />
                      </a>
                    </div>
                  </Col>
                );
              })
            }
          </Row>
        </div>
        <Cont active={active} />
      </Layout.Content>
    </Layout>
  );
}

const { Meta } = Card;

function Cont({ active }) {
  return (
    <section className="content">
      <Row gutter={24}>
        {
          products.filter(item => {
            if (active === 'all') return true;
            return item.type.includes(active);
          }).map((item) => {
            return (
              <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
                <Card
                  hoverable
                  style={{ width: '100%', marginBottom: 24, borderRadius: 2, overflow: 'hidden' }}
                  cover={
                    <img
                      className="itemImg"
                      alt={item.title}
                      src={`./img/${item.id % 10 + 1}.jpg`}
                    />
                  }
                  actions={[
                    <GithubOutlined key="setting" />,
                    <DingdingOutlined key="edit" />,
                  ]}
                >
                  <Meta
                    // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={item.title}
                    description={(
                      <div style={{ height: '90px' }}>
                        <h5>{item.subtitle}</h5>
                        {item.description}
                      </div>
                    )}
                  />
                </Card>
              </Col>
            )
          })
        }
      </Row>
    </section>
  )
}

export default App;
