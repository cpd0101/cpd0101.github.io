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
          <Input placeholder="URL Parameter Key" value={key} onChange={(e) => {
            this.handleKVChange(key, query[key], e.target.value, query[key]);
          }} onInput={(e) => {
            this.handleKVChange(key, query[key], e.target.value, query[key]);
          }} style={{ width: '30%', marginRight: '10px' }} />
          <Input placeholder="Value" value={query[key]} onChange={(e) => {
            this.handleKVChange(key, query[key], key, e.target.value);
          }} onInput={(e) => {
            this.handleKVChange(key, query[key], key, e.target.value);
          }} style={{ width: '30%', marginRight: '10px' }} />
          <Icon type="minus-circle-o" onClick={() => {
            this.handleKVDelete(key);
          }} />
        </FormItem>
      )
    })

    return (
      <Form>
        <FormItem>
          <Input placeholder="Enter URL here" value={urlStr} onChange={this.handleURLChange} onInput={this.handleURLChange} />
        </FormItem>
        {formItems}
        <FormItem>
          <Button type="dashed" onClick={this.handleKVAdd} style={{ width: '20%' }}>
            <Icon type="plus" /> Add Parameter
          </Button>
        </FormItem>
      </Form>
    )
  }

}

const WrappedURLParamsToolForm = Form.create()(URLParamsToolForm);

export default WrappedURLParamsToolForm;