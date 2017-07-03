import { RouteConfigComponentProps } from 'react-router-config';
import { DispatchProp } from 'react-redux';

export interface CommomComponentProps<P, S> extends RouteConfigComponentProps<P>, DispatchProp<S> {

}

export { FormComponentProps } from 'antd/lib/form/Form';
