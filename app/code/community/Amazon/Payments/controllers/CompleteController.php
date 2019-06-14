<?php
/**
 * Amazon Payments SCA Complete Controller
 *
 * @category    Amazon
 * @package     Amazon_Payments
 * @copyright   Copyright (c) 2014 Amazon.com
 * @license     http://opensource.org/licenses/Apache-2.0  Apache License, Version 2.0
 */

class Amazon_Payments_CompleteController extends Mage_Core_Controller_Front_Action
{
    /**
     * Complete SCA checkout
     */
    public function checkoutAction()
    {
        $authenticationStatus = $this->getRequest()->getParam('AuthenticationStatus');

        switch ($authenticationStatus) {
            case 'Success':
                try {
                    $payment = Mage::getSingleton('checkout/session')->getPayment();
                    $payment['additional_information']['is_sca'] = true;
                    $this->_getCheckout()->savePayment($payment);
                    $this->_getCheckout()->saveOrder();
                    $this->_getCheckout()->getQuote()->save();
                    return $this->_redirect('checkout/onepage/success');
                } catch (Exception $e) {
                    Mage::getSingleton('core/session')->addError($e->getMessage());
                    Mage::logException($e);
                }
                break;
            case 'Failure':
                Mage::getSingleton('core/session')->addError(
                    'Amazon Pay was unable to authenticate the payment instrument.  '
                    . 'Please try again, or use a different payment method.'
                );
                break;
            case 'Abandoned':
            default:
                Mage::getSingleton('core/session')->addError(
                    'The SCA challenge was not completed successfully.  '
                    . 'Please try again, or use a different payment method.'
                );
        }

        $this->_redirect('checkout/cart');
    }

    /**
     * Get checkout model
     *
     * @return Amazon_Payments_Model_Type_Checkout
     */
    protected function _getCheckout()
    {
        return Mage::getSingleton('amazon_payments/type_checkout');
    }
}
