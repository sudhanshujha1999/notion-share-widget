import React, { ReactElement } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Divider, IconButton, Typography } from '@mui/material';

import { colors } from '../../../../MuiWrapper/colors';
import CloseIcon from '../../../../asset/closeIcon.svg';

interface State {
  title?: string | ReactElement;
  confirmToClose?: Boolean;
  child?: ReactElement | null;
  isModalVisible?: boolean;
  onClose?: CallableFunction;
  disableSoftClose?: boolean;
  compactSize?: Boolean;
}

interface Props extends Omit<State, 'child'> {
  // interface Props extends State {
  title?: string;
  children?: ReactElement;
}

/**
 * @function Custom Modal
 * @description A wrapper over Martial UI Modal
 * ---
 * ### Benefit
 * - It can be called over onClick and without maintaining any state
 * - It doesn't re render parent to open/close a modal
 * - Easy to use!
 *
 * ### Limitation
 * - It can't be re rendered in sync with parent once opened (instead use as normal modal i.e. with state dependency)
 * ---
 * @example
 * - On Component side:
 *    (Boiler code)
 *    const [modalRef, setModalRef] = useState<CustomModal | null>(null);
 *    return(
 *      ...
 *      <CustomModal ref={setModalRef} />
 *    )
 *
 *    (onClick -- open)
 *     onClick={() => {
 *        modalRef.show({
 *          title: '',
 *          child: <div/>,
 *          onClose: () => {},
 *        })
 *     }}
 *
 *     ( -- close)
 *     modalRef.close()
 *
 *
 *     (Other way -- In case a component has to be open always in modal)
 *     <CustomModal> {Content} </CustomModal>
 *
 *
 */
class CustomModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isModalVisible: Boolean(props.children),
      child: null,
      title: props.title || '',
      onClose: undefined,
      disableSoftClose: props.disableSoftClose || false,
      compactSize: props.compactSize || false,
    };
    this.close = this.close.bind(this);
    this.closeWithConfirmation = this.closeWithConfirmation.bind(this);
    this.show = this.show.bind(this);
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.title !== state.title && !!props.children) {
      return {
        title: props.title,
      };
    }
    return null;
  }

  /**
   * @function show - Open modal
   * @description show modal including child component
   * @param {Boolean} disableSoftClose set true to disable close of modal when clicked outside of modal {default - false}
   * @param {Boolean} compactSize if true then modal will wrap content tightly
   * @param {ReactElement} child UI element to show inside modal
   * @param {string | ReactElement} title Title of the Modal
   * @param {string | ReactElement} if title is not present, then it is a full modal with padding 0.
   * @param {callbackFunction} onClose callback Function to be called on close of modal
   * ---
   * #### Call close() on modal ref to close modal.
   */
  show({
    child = null,
    title = this.props.title || '',
    onClose = undefined,
    disableSoftClose = false,
    compactSize = false,
    confirmToClose = false,
  }: State) {
    this.setState({
      isModalVisible: true,
      child,
      title,
      onClose,
      disableSoftClose,
      compactSize,
      confirmToClose,
    });
  }

  /**
   * @function close
   * @description close current open modal
   */
  close() {
    this.closeModal(true);
  }

  closeWithConfirmation() {
    this.closeModal(true, true);
  }

  closeModal(isForceClose = false, isConfirm = false) {
    const { onClose, disableSoftClose, confirmToClose } = this.state;

    if (!disableSoftClose || isForceClose) {
      if (confirmToClose && !isConfirm) {
        return;
      }

      this.setState({ isModalVisible: false, child: <div /> });

      if (onClose instanceof Function) {
        onClose();
      }
    }
  }

  render() {
    const { isModalVisible, child, title, compactSize } = this.state;
    const { children } = this.props;

    if (isModalVisible) {
      return (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={isModalVisible}
          onClose={() => this.closeModal()}
          closeAfterTransition
          BackdropProps={{
            timeout: 200,
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <>
            <Box
              style={{
                minWidth: compactSize ? 1 : 400,
                width: compactSize ? 'auto' : '90%',
                height: compactSize ? 'auto' : '90%',
                maxHeight: '90%',
                backgroundColor: colors.black1,
                borderRadius: '10px',
                boxShadow:
                  'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
                padding: title ? 20 : 0,
                overflowY: 'auto',
              }}
            >
              {children || (
                <>
                  {title && (
                    <>
                      <Box display="flex" justifyContent="space-between">
                        <Typography fontSize={24} paddingBottom={8}>
                          {title || ''}
                        </Typography>
                        <IconButton
                          size="large"
                          style={{ width: '40px', height: '40px' }}
                          onClick={() => this.closeModal(true)}
                        >
                          <img
                            width="15px"
                            height="15px"
                            src={CloseIcon}
                            alt="Close"
                          />
                        </IconButton>
                      </Box>
                      <Divider style={{ marginBottom: 16 }} />
                    </>
                  )}
                  {child || <div />}
                </>
              )}
            </Box>
          </>
        </Modal>
      );
    }

    return null;
  }
}

export default CustomModal;
