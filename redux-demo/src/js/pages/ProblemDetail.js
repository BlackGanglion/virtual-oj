import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Card, Button, Spin } from 'antd';
import { actions } from './ProblemDetailRedux';
import { Link } from 'react-router';
import ReactMarkdown from 'react-markdown';
import Latex from 'react-latex';

function mapStateToProps(state, ownProps) {
  return {
    ...state.problemDetail,
    OJId: ownProps.params.OJId,
    pid: ownProps.params.pid
  };
}

@connect(mapStateToProps, {
  ...actions
})
class ProblemDetail extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    OJId: PropTypes.string,
    pid: PropTypes.string,
    proData: PropTypes.object,
    requestProblem: PropTypes.func
  }

  componentDidMount() {
    this.props.requestProblem({
      OJId: this.props.OJId,
      pid: this.props.pid
    });
  }

  renderData(data) {
    if (this.props.loading) {
      return (<Spin size="large" />);
    } else {
      // return (<pre><ReactMarkdown source={data} /></pre>);
      return <pre><Latex>{data}</Latex></pre>
    }
  }

  render() {
    const { proData } = this.props;
    return (
      <div className="problem-detail">
        <h1 className="problem-title">{ proData.title }</h1>
        <div className="problem-header">
          <h3>
            TimeLimit: { proData.timelimit }MS,
            MemoryLimit: { proData.memorylimit }KB
          </h3>
          <Link to="/problems">返回主页</Link>
        </div>
        <Card className="problem-content" title="Problem Description">
          { this.renderData(proData.description) }
        </Card>
        <Card className="problem-content" title="Input">
          { this.renderData(proData.input) }
        </Card>
        <Card className="problem-content" title="Output">
          { this.renderData(proData.output) }
        </Card>
        <Card className="problem-content" title="Sample Input">
          { this.renderData(proData.sampleinput) }
        </Card>
        <Card className="problem-content" title="Sample Output">
          { this.renderData(proData.sampleoutput) }
        </Card>
      </div>
    )
  }
}

export default ProblemDetail;
