import * as React from 'react';
import { Form, Icon, Input, Button, message, Checkbox } from 'antd';
import fetch from 'helper/fetch';
import { CommomComponentProps, FormComponentProps } from 'models/component';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import * as style from './style.less';

const FormItem = Form.Item;

interface LoginProps { };

interface LoginState {
  loading: boolean;
};

class Login extends React.Component<CommomComponentProps<LoginProps, LoginState> & FormComponentProps, LoginState> {

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  // public componentWillMount() {
  //   fetch('/api/profile')
  //     .then(res => {
  //       console.log(res);
  //     });
  // }

  private handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        });
        fetch('/authentication/login/process', {
          method: 'POST',
          body: values
        })
          .then(res => {
            if (res) {
              console.log(res);
            }

            this.setState({
              loading: false
            });
          });
      }
    });
  }

  public render(): JSX.Element {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={style.LoginBox} >
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名' }],
            })(
              <Input prefix={<Icon type="user" className={style.Icon} />} placeholder="用户名" />
              )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }],
            })(
              <Input prefix={<Icon type="lock" className={style.Icon} />} type="password" placeholder="密码" />
              )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住我</Checkbox>
              )}
            <a className={style.LoginFormForgot} href="">忘记密码</a>
            <Button type="primary" htmlType="submit" className={style.SubmitBtn} loading={this.state.loading}>
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default connect(null)(Form.create()(Login) as any) as any;
