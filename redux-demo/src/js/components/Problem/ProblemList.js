import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Table, Spin } from 'antd';
import { connect } from 'react-redux';
import { actions } from './ProblemListRedux';
import { OJList } from '../../config/config';
import { Link } from 'react-router';

function changeTimeFormat(time) {
  let date = new Date(time);
  let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  let currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  return date.getFullYear() + "-" + month + "-" + currentDate + " " + hh + ":" + mm;
}

@connect(state => {
  return {
    ...state.problems.problemList,
    OJId: state.problems.problemNav.OJId,
    searchPid: state.problems.problemNav.searchPid
  };
}, {
  ...actions
})
class ProblemList extends Component {
  static propTypes = {
    OJProblems: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    isFetchPro: PropTypes.bool.isRequired,
    requestProblems: PropTypes.func.isRequired,
    OJId: PropTypes.number.isRequired,
    searchPid: PropTypes.string
  };

  constructor(props) {
    super(props);
  };

  componentDidMount() {
    this.props.requestProblems({
      OJId: this.props.OJId,
      searchPid: this.props.searchPid
    });
    if (this.props.isFetchPro) {
      console.log('componentDidMount fetch');
      let self = this;
      setTimeout(function(){
        self.props.requestProblems({
          OJId: self.props.OJId,
          searchPid: self.props.searchPid
        });
      }, 2000);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.OJId !== prevProps.OJId
      || this.props.searchPid !== prevProps.searchPid) {
      this.props.requestProblems({
        OJId: this.props.OJId,
        searchPid: this.props.searchPid
      });
    }
    if (this.props.isFetchPro) {
      console.log('componentDidUpdate fetch');
      let self = this;
      setTimeout(function(){
        self.props.requestProblems({
          OJId: self.props.OJId,
          searchPid: self.props.searchPid
        });
      }, 2000);
    }
  }

  render() {
    const { OJProblems, loading } = this.props;

    const columns = [{
      title: 'OJ',
      dataIndex: 'OJId',
      key: 'OJId',
      width: 120,
      render: (id) => OJList[id].OJName
    }, {
      title: 'Prob ID',
      dataIndex: 'pid',
      key: 'pid',
      width: 120,
      sorter: (a, b) => a.pid - b.pid
    }, {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      render: (title, item, i) => {
        if(item.status) {
          return (<Link to={`/problem/${item.OJId}/${item.pid}`}>{title}</Link>);
        } else {
          return (<Spin />);
        }
      }
    }, {
      title: 'Update Time',
      dataIndex: 'time',
      key: 'time',
      width: 200,
      sorter: (a, b) => a.time - b.time,
      render: (time, item) => {
        if(item.status) {
          return changeTimeFormat(parseInt(time));
        } else {
          return (<Spin />);
        }
      }
    }, {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
      render: (source, item) => {
        if(item.status) {
          return source;
        } else {
          return (<Spin />);
        }
      }
    }];

    return(
      <div className="problem-list" >
        <Table rowKey={(record) => record.OJId + record.pid}
          loading={loading}
          columns={columns}
          dataSource={OJProblems} />
      </div>
    );
  }
}

export default ProblemList;
