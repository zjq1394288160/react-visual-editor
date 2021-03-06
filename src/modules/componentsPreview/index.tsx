import React, { Component } from 'react';
import { Tabs } from 'antd';
import { flattenDeepArray, reduxConnect } from '@/utils';
import config from '@/configs';
import FoldPanel from './components/foldPanel';
import styles from './index.less';
import TemplatePanel from './components/templatePanel';
import { SelectedComponentInfoType, TemplateInfoType } from '@/types/ModelType';
import {Dispatch} from 'redux'
import {formatMessage} from 'umi-plugin-react/locale'
const { TabPane } = Tabs;

interface AllComponentsPropsType {
  dispatch?:Dispatch,
  selectedComponentInfo?:SelectedComponentInfoType,
  templateInfos?:TemplateInfoType[]
}

interface AllComponentsStateType{
  activeKey:string
}

@reduxConnect(['selectedComponentInfo','templateInfos'])
export default class AllComponents extends Component<AllComponentsPropsType,AllComponentsStateType> {
  constructor(props:AllComponentsPropsType) {
    super(props);
    this.state = {
      activeKey: 'container',
    };
  }

  TabsChange = (activeKey:string) => {
    this.setState({
      activeKey,
    });
  };


  render() {
    const { activeKey } = this.state;
    const { selectedComponentInfo,templateInfos,dispatch } = this.props;
    return (
      <Tabs className={styles['tabs-container']} activeKey={activeKey} onChange={this.TabsChange}>
        <TabPane forceRender className={styles['tabs-panel']} tab={formatMessage({id:'BLOCK_NAME.componentsPreview.container'})} key="container">
          <FoldPanel isShow={activeKey === 'container'}
                     selectedComponentInfo={selectedComponentInfo!}
                     componentsCategory={config.CONTAINER_CATEGORY}
                     searchValues={flattenDeepArray(config.CONTAINER_CATEGORY)}
          />
        </TabPane>
        <TabPane forceRender className={styles['tabs-panel']} tab={formatMessage({id:'BLOCK_NAME.componentsPreview.nonContainer'})} key="nonContainer">
          <FoldPanel isShow={activeKey === 'nonContainer'}
                     selectedComponentInfo={selectedComponentInfo!}
                     componentsCategory={config.NON_CONTAINER_CATEGORY}
                     searchValues={flattenDeepArray(config.NON_CONTAINER_CATEGORY)}

          />
        </TabPane>
        <TabPane className={styles['tabs-panel']} style={{paddingLeft:20,paddingRight:20}} tab={formatMessage({id:'BLOCK_NAME.componentsPreview.template'})}  key="module">
          <TemplatePanel dispatch={dispatch!} templateInfos={templateInfos!} isShow={activeKey === 'module'}/>
        </TabPane>
      </Tabs>
    );
  }
}
