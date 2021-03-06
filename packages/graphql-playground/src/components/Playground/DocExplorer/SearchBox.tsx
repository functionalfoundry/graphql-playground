import * as React from 'react'
import debounce from 'graphiql/dist/utility/debounce'
import { Icon } from 'graphcool-styles'
import * as cx from 'classnames'

export interface Props {
  isShown: boolean
  onSearch: (value: string) => void
  placeholder?: string
  clean?: boolean
}

export interface State {
  value: string
}

export default class SearchBox extends React.Component<Props, State> {
  private debouncedOnSearch: any

  constructor(props) {
    super(props)

    this.state = { value: '' }

    this.debouncedOnSearch = debounce(200, () => {
      this.props.onSearch(this.state.value)
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.isShown !== this.props.isShown ||
      nextState.value !== this.state.value
    )
  }

  render() {
    return (
      <div className={cx(!this.props.clean && 'search-box')}>
        <style jsx={true}>{`
          .search-box {
            @p: .pa25, .bgBlack02, .bb, .bBlack10, .relative, .flexFixed;
            z-index: 1;
            margin-left: 6px;
          }
          .label {
            @p: .bgWhite, .bbox, .w100, .flex, .itemsCenter, .bgWhite;
            padding: 12px 14px 13px 15px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
          }
          .input {
            @p: .f16, .ml10;
          }
          .input::placeholder {
            color: rgba(0, 0, 0, 0.3);
          }
        `}</style>
        {this.props.isShown &&
          <label className="label">
            <Icon
              src={require('graphcool-styles/icons/stroke/search.svg')}
              stroke={true}
              strokeWidth={3}
              color={'rgba(0, 0, 0, 0.3)'}
            />
            <input
              className="input"
              onChange={this.handleChange}
              type="text"
              value={this.state.value}
              placeholder={this.props.placeholder || 'Search the schema ...'}
            />
          </label>}
      </div>
    )
  }

  handleChange = event => {
    this.setState({ value: event.target.value })
    this.debouncedOnSearch()
  }
}
