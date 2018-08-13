import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SuccessIcon from '../icon/Success'
import FailureIcon from '../icon/Failure'
import WarningIcon from '../icon/Warning'
import CloseIcon from '../icon/Close'
import config from 'vtex-tachyons/config.json'
import Button from '../../Button'

class Alert extends Component {
  componentDidMount() {
    if (this.props.autoClose && this.props.onClose) {
      this.timeout = setTimeout(this.props.onClose, this.props.autoClose)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render() {
    const { type, onClose, onActionClick, actionLabel } = this.props
    let classes = 'pa5 br2 '
    let showIcon = false
    let Icon = 'div'
    let color = config.colors['serious-black']

    switch (type) {
      case 'success': {
        showIcon = true
        classes += 'bg-washed-green '
        Icon = SuccessIcon
        color = config.colors['green']
        break
      }
      case 'error': {
        showIcon = true
        classes += 'bg-washed-red '
        Icon = FailureIcon
        color = config.colors['red']
        break
      }
      case 'warning': {
        showIcon = true
        classes += 'bg-washed-yellow '
        Icon = WarningIcon
        color = config.colors['yellow']
        break
      }
      default: {
        classes += 'bg-washed-blue '
        break
      }
    }

    return (
      <div
        className={`vtex-alert flex justify-between f5 near-black ${classes}`}
      >
        <div className="flex-ns flex-grow-1">
          <div className="flex items-center flex-grow-1">
            {showIcon && (
              <div>
                <Icon color={color} size={18} />
              </div>
            )}

            <div className={`${showIcon ? 'ph5 flex' : 'pr5'}`}>
              {this.props.children}
            </div>
          </div>

          {actionLabel &&
            onActionClick && (
              <div className="flex flex-grow-1 justify-end">
                <div className="nt4-ns nb4">
                  <Button variation="tertiary" onClick={onActionClick}>
                    {actionLabel}
                  </Button>
                </div>
              </div>
            )}
        </div>
        {onClose && (
          <div
            className="vtex-alert__close-icon pointer flex items-center pv2"
            onClick={onClose}
          >
            <CloseIcon color={config.colors['near-black']} size={10} />
          </div>
        )}
      </div>
    )
  }
}

Alert.propTypes = {
  /** Style of the alert */
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  /** Content of the alert */
  children: PropTypes.node.isRequired,
  /** If this function is defined, a close icon will appear and this function will be called when alert is closed. */
  onClose: PropTypes.func,
  /** Time in ms to auto close the alert */
  autoClose: PropTypes.number,
  /** If this string is defined, an action button will appear on the right side of the alert. */
  actionLabel: PropTypes.string,
  /** If this function is defined, it will be called when the button is clicked. */
  onActionClick: PropTypes.func,
}

Alert.defaultProps = {
  type: 'info',
}

export default Alert
