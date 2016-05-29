import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { actions } from './ProblemListRedux';

import { OJList } from '../../config/config';

/*
const data = [
  {
    "OJId": 0,
    "pid": 1000,
    "title": "A + B Problem",
    "time": 1460723511,
    "source": "水题集1"
  },
  {
    "OJId": 0,
    "pid": 1001,
    "title": "Sum Problem",
    "time": 1460723510,
    "source": "水题集2"
  },
  {
    "OJId": 0,
    "pid": 1002,
    "title": "A + B Problem II",
    "time": 1460723509,
    "source": "水题集3"
  }
]
*/

@connect(state => {
  return {
    ...state.problems.problemList
  };
}, {
  ...actions
})

class ProblemList extends Component {
  static propTypes = {
    OJProblems: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    requestProblems: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  };

  componentDidMount() {
    this.props.requestProblems({OJId: 0});
  }

  render() {
    const { OJProblems, loading } = this.props;

    const columns = [{
      title: 'OJ',
      dataIndex: 'OJId',
      key: 'OJId',
      render: (id) => OJList[0].OJName
    }, {
      title: 'Prob ID',
      dataIndex: 'pid',
      key: 'pid',
      sorter: (a, b) => a.pid - b.pid
    }, {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title, item, i) => <a href={`/problem/${item.OJId}/${item.pid}`}>{title}</a>
    }, {
      title: 'Update Time',
      dataIndex: 'time',
      key: 'time',
      sorter: (a, b) => a.time - b.time
    }, {
      title: 'Source',
      dataIndex: 'source',
      key: 'source'
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
