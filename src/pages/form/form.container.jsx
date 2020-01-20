import { connect } from 'react-redux'
import WithSpinner from '../../components/Spinner/Spinner'
import { compose } from 'redux'
import Form from './form'

const mapState = state => ({
    isLoading: state.UserReducer.isLoading,
})


const FormPageContainer = compose(
    connect(mapState),
    WithSpinner
)(Form)

export default FormPageContainer