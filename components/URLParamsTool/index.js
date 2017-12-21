import React from 'react';
import { Form, Input, Icon, Button } from 'antd';
const FormItem = Form.Item;
import url from 'modulex-url'

class URLParamsToolForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      urlStr: '',
      query: {},
    };
  }

  handleKVChange = (prevKey, prevValue, key, value) => {
    const { urlStr = '', query = {} } = this.state;
    const uri = url.parse(urlStr, true);
    const newQuery = {};
    Object.keys(query).forEach((k) => {
      if (prevKey === k) {
        newQuery[key.trim()] = value.trim();
      } else {
        newQuery[k] = query[k];
      }
    });
    uri.query = newQuery;
    delete uri.search;
    this.setState({
      urlStr: url.format(uri),
      query: newQuery,
    });
  }

  handleKVDelete = (key) => {
    const { urlStr = '', query = {} } = this.state;
    const uri = url.parse(urlStr, true);
    const newQuery = {};
    Object.keys(query).forEach((k) => {
      if (key !== k) {
        newQuery[k] = query[k];
      }
    });
    uri.query = newQuery;
    delete uri.search;
    this.setState({
      urlStr: url.format(uri),
      query: newQuery,
    });
  }

  handleURLChange = (e) => {
    const urlStr = e.target.value.trim();
    const uri = url.parse(urlStr, true)
    this.setState({
      urlStr,
      query: uri.query,
    });
  }

  handleKVAdd = (e) => {
    const key = '';
    const { urlStr = '', query = {} } = this.state;
    const uri = url.parse(urlStr, true);
    const newQuery = uri.query || {};
    newQuery[key] = newQuery[key] || '';
    uri.query = newQuery;
    delete uri.search;
    this.setState({
      urlStr: url.format(uri),
      query: newQuery,
    });
  }
  
  render() {
    const { urlStr = '', query = {} } = this.state;

    const formItems = Object.keys(query).map((key, index) => {
      return (
        <FormItem key={index}>
          <Input placeholder="Key" value={key} onChange={(e) => {
            this.handleKVChange(key, query[key], e.target.value, query[key]);
          }} style={{ width: '30%', marginRight: '10px' }} />
          <Input placeholder="Value" value={query[key]} onChange={(e) => {
            this.handleKVChange(key, query[key], key, e.target.value);
          }} style={{ width: '30%', marginRight: '10px' }} />
          <Button type="dashed" onClick={() => {
            this.handleKVDelete(key);
          }}>
            <Icon type="minus" />
          </Button>
        </FormItem>
      )
    })

    return (
      <Form>
        <FormItem style={{ marginBottom: '12px' }}>
          <h3>URL参数拼接</h3>
        </FormItem>
        <FormItem>
          <Input name="url" placeholder="输入URL" value={urlStr} onChange={this.handleURLChange} />
        </FormItem>
        {formItems}
        <FormItem>
          <Button onClick={this.handleKVAdd}>
            新增参数
          </Button>
        </FormItem>
      </Form>
    )
  }

}

const WrappedURLParamsToolForm = Form.create()(URLParamsToolForm);

export default WrappedURLParamsToolForm;