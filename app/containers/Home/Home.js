import React, { Component } from 'react';
import { connect } from 'react-redux';
// import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import styles from './Home.scss';
import moment from 'moment';
import * as actions from '../../actions/index';

class Home extends Component {

    componentDidMount() {
        this.props.loadClient();
        this.props.loadTrade();
        this.props.loadNote();
    }

    render() {
        const { clients, trade, notes } = this.props;
        return (
          <div>
            <div className="container">
              <div className={`col-md-8 col-xs-12 ${styles.dotted_border}`}>
                <span className={styles.main_title}>{clients && clients.type} account</span>
                <h2>{clients && clients.name}</h2>

                <div className={`row ${styles.main_info}`}>
                  <div className="col-sm-6">
                      <p>
                        {clients && clients.phone}
                      </p>
                      <p><a href="#">{clients && clients.id}</a></p>
                      <p>NP: <strong>{clients && `$ ${clients.net_position}`}</strong></p>
                  </div>
                  <div className={`col-sm-6 ${styles.client_contacts_block}`}>
                      <div>
                        <span className={styles.title}>Main contact <i className="fa fa-user-o"></i></span>
                        <span><strong>{clients && clients.main_contact.name}</strong></span>
                        <span>{clients && clients.main_contact.position}</span>
                      </div>
                  </div>
                </div>

                <table className={`table responsive bordered ${styles.no_center_border} ${styles.aligned_table}`}>
                  <thead>
                    <tr>
                      <td className={styles.title}>Dealer</td>
                      <td className={styles.title}>Last Login</td>
                      <td className={styles.title}>Last Call</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{clients && clients.dealer}</td>
                      <td>{clients && moment(clients.last_login).format('MMM D k:mm')}</td>
                      <td>{clients && moment(clients.last_call.date).format('MMM D k:mm')} ({clients && clients.last_call.contact})</td>
                    </tr>
                  </tbody>
                </table>
                <h5 className={styles.title}>Last Notes <i className="fa fa-4 fa-commenting-o" aria-hidden="true"></i></h5>
                <ul className="list-unstyled">
                  {notes && notes.map(item => (
                    <li
                      className={styles.space}
                      key={item.id}>
                        <span>
                          {moment(item.date).format('MMM D')}
                        </span> <span>{item.author}:
                        </span>
                        <span>
                          {item.text}
                        </span>
                      </li>
                  ))}
                </ul>
              </div>
              <div className="col-md-4 col-xs-6">
                <span className={styles.main_title}>Active Trade</span>
                <h3 className="text-uppercase">{trade && trade.id}</h3>
                <div>
                  <table className={`table responsive ${styles.aligned_table}`}>
                    <thead>
                      <tr>
                        <td className={styles.title}>Buy</td>
                        <td>{trade && trade.buy.amount} {trade && trade.buy.currency}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={styles.title}>Sell</td>
                        <td>{trade && trade.sell.amount} {trade && trade.sell.currency}</td>
                      </tr>
                      <tr>
                        <td className={styles.title}>Margin</td>
                        <td>{trade && trade.margin}%</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="dealer">
                    <ul className="list-unstyled">
                      <li className={styles.title}>Dealer</li>
                      <li>{trade && trade.dealer}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className={`panel-body ${styles.panel_footer}`}>
                <div className="container">
                    <div className="col-md-8 col-xs-12">
                      <button
                        type="button"
                        className={`btn btn-success
                          ${styles.wellStyles}
                          ${styles.btn_accept}`
                        }
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        className={`btn btn-info
                          ${styles.wellStyles}
                          ${styles.btn_transfer}`
                        }
                      >
                        Transfer
                      </button>
                    </div>
                    <div className="col-md-4 col-xs-12">
                      <div className="btn-group">
                        <button
                          type="button"
                          className={`btn btn-danger
                            ${styles.wellStyles}
                            ${styles.btn_decline}`
                          }
                        >
                          Decline
                        </button>
                      </div>
                  </div>
                </div>
            </div>
          </div>
        );
    }

}


Home.propTypes = {
    clients: PropTypes.object,
    trade: PropTypes.object,
    notes: PropTypes.array,
    loadClient: PropTypes.func.isRequired,
    loadTrade: PropTypes.func.isRequired,
    loadNote: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        clients: state.client.data,
        trade: state.trade.data,
        notes: state.notes.data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadClient: () => dispatch(actions.loadClient()),
        loadTrade: () => dispatch(actions.loadTrade()),
        loadNote: () => dispatch(actions.loadNotes())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

