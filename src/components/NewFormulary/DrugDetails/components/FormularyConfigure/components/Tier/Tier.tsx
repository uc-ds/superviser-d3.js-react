import React from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import FrxMiniTabs from "../../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import DialogPopup from "../../../../../../shared/FrxDialogPopup/FrxDialogPopup";
import "./Tier.scss";

import { getMiniTabs } from "../../../../../../../mocks/formulary/mock-data";
import CustomizedSwitches from "../CustomizedSwitches";
import PanelHeader from "../PanelHeader";
import PanelGrid from "../panelGrid";
import { TabInfo } from "../../../../../../../models/tab.model";
import TierReplace from "./TierReplace";
import TierRemove from "./TierRemove";
import { getTier } from "../../../../../../../redux/slices/formulary/tier/tierActionCreation";
import DropDown from "../../../../../../shared/Frx-components/dropdown/DropDown";
function mapDispatchToProps(dispatch) {
  return {
    getTier: (a) => dispatch(getTier(a)),
  };
}

interface Props {
  onClose: any;
  openPopup: boolean;
  className?: string;
  mode?: "single" | "multi";
  selectedItem?: any;
  type: string;
}

interface tabsState {
  activeMiniTabIndex: number;
  miniTabs: any;
  tabs: any;
  tierGridContainer: boolean;
  activeTabIndex: any;
  panelGridValue: any;
  tierPopupInd: boolean;
  show: boolean;
}

const GreenCheckIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='19'
    height='19'
    viewBox='0 0 19 19'
    fill='none'
  >
    <path
      d='M9.5 0C4.25379 0 0 4.25379 0 9.5C0 14.7462 4.25379 19 9.5 19C14.7462 19 19 14.7462 19 9.5C19 4.25379 14.7462 0 9.5 0ZM13.6032 6.39766L9.13739 12.5896C9.07497 12.6767 8.99269 12.7477 8.89736 12.7967C8.80203 12.8457 8.6964 12.8712 8.58923 12.8712C8.48206 12.8712 8.37643 12.8457 8.2811 12.7967C8.18577 12.7477 8.10349 12.6767 8.04107 12.5896L5.39676 8.92533C5.31618 8.81295 5.39676 8.65603 5.5346 8.65603H6.52913C6.74542 8.65603 6.95112 8.75993 7.07835 8.93806L8.58817 11.0331L11.9217 6.41038C12.0489 6.23437 12.2525 6.12835 12.4709 6.12835H13.4654C13.6032 6.12835 13.6838 6.28527 13.6032 6.39766Z'
      fill='#80C483'
    />
  </svg>
);
class Tier extends React.Component<any, tabsState> {
  state = {
    tierGridContainer: false,
    miniTabs: getMiniTabs(),
    isFetchingData: false,
    activeMiniTabIndex: 0,
    activeTabIndex: 0,
    tierPopupInd: false,
    show: false,
    tabs: [
      { id: 1, text: "Replace" },
      { id: 2, text: "Append" },
      { id: 3, text: "Remove" },
    ],
    panelGridTitle: [
      "TIER NAME",
      "TIER DESCRIPTION",
      "CURRENT ACCOUNT",
      "ADDED",
      "REMOVED",
      "VALIDATION",
    ],
    panelGridValue: [
      ["Tier 0", "OTC", "2", "4", "2", <GreenCheckIcon />],
      ["Tier 1", "OTC", "2", "4", "2", <GreenCheckIcon />],
      ["Tier 2", "OTC", "2", "4", "2", <GreenCheckIcon />],
      ["Tier 3", "OTC", "2", "4", "2", <GreenCheckIcon />],
    ],
  };

  onClose = () => {
    console.log("close");
    this.setState({ tierPopupInd: false });
    return true;
  };

  handleIconClick = () => {
    this.setState({ tierPopupInd: true });
  };
  processCloseActions = () => {
    this.setState({ show: true });
  };

  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });
    this.setState({ tabs, activeTabIndex });
  };

  renderTabContent = () => {
    const activeTabIndex = this.state.activeTabIndex;
    switch (activeTabIndex) {
      case 0:
        return <TierReplace />;
      case 1:
        return <div>Append</div>;
      case 2:
        return <TierRemove />;
    }
  };

  onClickMiniTab = (num: number) => {
    this.setState({
      activeMiniTabIndex: num,
    });
  };

  openTierGridContainer = () => {
    this.setState({ tierGridContainer: true });
  };

  componentDidMount() {
    this.props.getTier("1").then((json) => {
      console.log("*******************************" + json);
      console.log(json.payload.data);
      //this.setState({panelGridValue: json.payload.data});
    });
  }

  render() {
    return (
      <div className='drug-detail-LA-root'>
        <div className='drug-detail-la-container'>
          <div className='drug-detail-la-inner'>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className='mb-10'>
                  <div className='limited-access'>
                    <PanelHeader
                      title='Tier Definition'
                      tooltip='This section allows for Addition or Removal of product only. To define coverage for all Medicare covered and/or Supplemental products, go to Drug Details'
                    />
                    <div className='inner-container tier-checkbox white-bg'>
                      <PanelGrid
                        panelGridTitle={this.state.panelGridTitle}
                        panelGridValue={this.state.panelGridValue}
                      />
                      {!this.props.isReadOnly ? (
                        <div className='tier-popup-btn'>
                          <svg
                            onClick={(e) => this.handleIconClick()}
                            width='75'
                            height='25'
                            viewBox='0 0 75 25'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M33.2554 14.521C33.1929 14.396 33.1421 14.1733 33.103 13.853C32.5991 14.3765 31.9976 14.6382 31.2983 14.6382C30.6733 14.6382 30.1597 14.4624 29.7573 14.1108C29.3589 13.7554 29.1597 13.3062 29.1597 12.7632C29.1597 12.103 29.4097 11.5913 29.9097 11.228C30.4136 10.8608 31.1206 10.6772 32.0308 10.6772H33.0854V10.1792C33.0854 9.80029 32.9722 9.49951 32.7456 9.27686C32.519 9.05029 32.1851 8.93701 31.7437 8.93701C31.3569 8.93701 31.0327 9.03467 30.771 9.22998C30.5093 9.42529 30.3784 9.66162 30.3784 9.93896H29.2886C29.2886 9.62256 29.3999 9.31787 29.6226 9.0249C29.8491 8.72803 30.1538 8.49365 30.5366 8.32178C30.9233 8.1499 31.3472 8.06396 31.8081 8.06396C32.5386 8.06396 33.1108 8.24756 33.5249 8.61475C33.939 8.97803 34.1538 9.47998 34.1694 10.1206V13.0386C34.1694 13.6206 34.2437 14.0835 34.3921 14.4272V14.521H33.2554ZM31.4565 13.6948C31.7964 13.6948 32.1187 13.6069 32.4233 13.4312C32.728 13.2554 32.9487 13.0269 33.0854 12.7456V11.4448H32.2358C30.9077 11.4448 30.2437 11.8335 30.2437 12.6108C30.2437 12.9507 30.3569 13.2163 30.5835 13.4077C30.8101 13.5991 31.1011 13.6948 31.4565 13.6948ZM35.605 11.2983C35.605 10.3257 35.8354 9.54443 36.2964 8.95459C36.7573 8.36084 37.3608 8.06396 38.1069 8.06396C38.8491 8.06396 39.437 8.31787 39.8706 8.82568V5.521H40.9546V14.521H39.9585L39.9058 13.8413C39.4722 14.3726 38.8687 14.6382 38.0952 14.6382C37.3608 14.6382 36.7612 14.3374 36.2964 13.7358C35.8354 13.1343 35.605 12.3491 35.605 11.3804V11.2983ZM36.689 11.4214C36.689 12.1401 36.8374 12.7026 37.1343 13.1089C37.4312 13.5151 37.8413 13.7183 38.3647 13.7183C39.0522 13.7183 39.5542 13.4097 39.8706 12.7925V9.88037C39.5464 9.28271 39.0483 8.98389 38.3765 8.98389C37.8452 8.98389 37.4312 9.18896 37.1343 9.59912C36.8374 10.0093 36.689 10.6167 36.689 11.4214ZM42.3784 11.2983C42.3784 10.3257 42.6089 9.54443 43.0698 8.95459C43.5308 8.36084 44.1343 8.06396 44.8804 8.06396C45.6226 8.06396 46.2104 8.31787 46.644 8.82568V5.521H47.728V14.521H46.7319L46.6792 13.8413C46.2456 14.3726 45.6421 14.6382 44.8687 14.6382C44.1343 14.6382 43.5347 14.3374 43.0698 13.7358C42.6089 13.1343 42.3784 12.3491 42.3784 11.3804V11.2983ZM43.4624 11.4214C43.4624 12.1401 43.6108 12.7026 43.9077 13.1089C44.2046 13.5151 44.6147 13.7183 45.1382 13.7183C45.8257 13.7183 46.3276 13.4097 46.644 12.7925V9.88037C46.3198 9.28271 45.8218 8.98389 45.1499 8.98389C44.6187 8.98389 44.2046 9.18896 43.9077 9.59912C43.6108 10.0093 43.4624 10.6167 43.4624 11.4214ZM53.4175 8.18115L53.4526 8.97803C53.937 8.36865 54.5698 8.06396 55.3511 8.06396C56.6909 8.06396 57.3667 8.81982 57.3784 10.3315V14.521H56.2944V10.3257C56.2905 9.86865 56.1851 9.53076 55.978 9.31201C55.7749 9.09326 55.4565 8.98389 55.0229 8.98389C54.6714 8.98389 54.3628 9.07764 54.0972 9.26514C53.8315 9.45264 53.6245 9.69873 53.4761 10.0034V14.521H52.3921V8.18115H53.4175ZM61.644 14.6382C60.7847 14.6382 60.0854 14.3569 59.5464 13.7944C59.0073 13.228 58.7378 12.4722 58.7378 11.5269V11.3276C58.7378 10.6987 58.8569 10.1382 59.0952 9.646C59.3374 9.1499 59.6733 8.76318 60.103 8.48584C60.5366 8.20459 61.0054 8.06396 61.5093 8.06396C62.3335 8.06396 62.9741 8.33545 63.4312 8.87842C63.8882 9.42139 64.1167 10.1987 64.1167 11.2104V11.6616H59.8218C59.8374 12.2866 60.019 12.7925 60.3667 13.1792C60.7183 13.562 61.1636 13.7534 61.7026 13.7534C62.0854 13.7534 62.4097 13.6753 62.6753 13.519C62.9409 13.3628 63.1733 13.1558 63.3726 12.8979L64.0347 13.4136C63.5034 14.23 62.7065 14.6382 61.644 14.6382ZM61.5093 8.95459C61.0718 8.95459 60.7046 9.11475 60.4077 9.43506C60.1108 9.75146 59.9272 10.1968 59.8569 10.771H63.0327V10.689C63.0015 10.1382 62.853 9.7124 62.5874 9.41162C62.3218 9.10693 61.9624 8.95459 61.5093 8.95459ZM70.9897 13.0269L72.2085 8.18115H73.2925L71.4468 14.521H70.5679L69.0269 9.71631L67.5269 14.521H66.6479L64.8081 8.18115H65.8862L67.1343 12.9272L68.6108 8.18115H69.4839L70.9897 13.0269Z'
                              fill='#707683'
                            />
                            <path
                              fill-rule='evenodd'
                              clip-rule='evenodd'
                              d='M18.0312 18.0314C21.3507 14.712 21.3507 9.33007 18.0312 6.01059C14.7117 2.69111 9.32985 2.69115 6.01041 6.01059C2.69097 9.33003 2.69092 14.7119 6.01041 18.0314C9.32989 21.3509 14.7118 21.3508 18.0312 18.0314ZM17.3241 17.3243C20.2531 14.3954 20.253 9.6466 17.3241 6.7177C14.3952 3.7888 9.64646 3.78875 6.71751 6.7177C3.78857 9.64664 3.78861 14.3954 6.71751 17.3243C9.64641 20.2532 14.3952 20.2532 17.3241 17.3243Z'
                              fill='#707683'
                            />
                            <path
                              d='M7.52082 12.021C7.52082 12.2971 7.74468 12.521 8.02082 12.521H11.5208V16.021C11.5208 16.2971 11.7447 16.521 12.0208 16.521C12.297 16.521 12.5208 16.2971 12.5208 16.021V12.521L16.0208 12.521C16.297 12.521 16.5208 12.2971 16.5208 12.021C16.5208 11.7448 16.297 11.521 16.0208 11.521H12.5208L12.5208 8.02099C12.5208 7.74485 12.297 7.52099 12.0208 7.52099C11.7447 7.52099 11.5208 7.74485 11.5208 8.02099V11.521H8.02082C7.74468 11.521 7.52082 11.7448 7.52082 12.021Z'
                              fill='#707683'
                            />
                            <line
                              x1='29.521'
                              y1='17.021'
                              x2='72.521'
                              y2='17.021'
                              stroke='#707683'
                              stroke-dasharray='1 1'
                            />
                          </svg>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className='mb-10'>
                  <div className='limited-access'>
                    <PanelHeader title='Tier Definition Settings' />
                    <div className='modify-wrapper white-bg tier-modify-panel'>
                      <div className='modify-panel'>
                        <div className='icon'>
                          <span>R</span>
                        </div>
                        <div className='switch-box'>
                          <CustomizedSwitches
                            leftTitle='Modify'
                            rightTitle='view all'
                          />
                        </div>
                        <div className='mini-tabs'>
                          <FrxMiniTabs
                            tabList={this.state.tabs}
                            activeTabIndex={this.state.activeTabIndex}
                            onClickTab={this.onClickTab}
                            disabledIndex={1}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div className='tab-content'>{this.renderTabContent()}</div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
          <DialogPopup
            className='tier-dialog-popup'
            showCloseIcon={true}
            positiveActionText='Save'
            negativeActionText='Cancel'
            title='TIER DEFINITION'
            handleClose={() => {
              this.onClose();
            }}
            handleAction={() => {
              debugger;
              console.log("do some action");
            }}
            showActions={true}
            open={this.state.tierPopupInd}
          >
            <div className='tier-definition-container'>
              <Grid item xs={12}>
                <div className='tier-definition-popup-wrapper'>
                  <div className='tier-number-wrapper'>
                    <div className='heading border-right'>tier number</div>
                    <div className='tier-number border-right'>Tier 4</div>
                  </div>
                  <div className='tier-description-wrapper'>
                    <div className='heading'>tier description</div>
                    <div className='tier-description'>
                      <DropDown
                        className='tier-description-dropdown'
                        placeholder='Select'
                        options={[1, 2, 3]}
                      />
                    </div>
                  </div>
                </div>
              </Grid>
            </div>
          </DialogPopup>
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Tier);
