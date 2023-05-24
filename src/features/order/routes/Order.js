import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Head } from '@/components/Head';
import { ContentLayout } from '@/components/Layout';
import { getProduct } from '../../product/api/staticProduct';
import { useAuth } from '@/lib/auth';
import { useNavigate } from 'react-router';
import { Button, Link } from '@/components/Elements';
import { SaveIcon, ArrowCircleLeftIcon, EyeIcon } from '@heroicons/react/outline';
import { useNotificationStore } from '@/stores/notifications';
import { useSaveOrder } from '../api/saveOrder';
import Cookies from 'js-cookie';
import { COOKIES_TYPE } from '@/utils/enum';
import { sendEvent } from '@/utils/sendEvent';
import { EVENT_TYPE } from '@/utils/enum';

export const Order = () => {
  const saveOrderMutation = useSaveOrder();
  const { productId } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();
  const { user } = auth;
  const [product, setProduct] = useState();
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!productId) {
      navigate('/public/products');
    } else {
      async function getProductForOrder() {
        const result = await getProduct(productId);
        setProduct(() => result);
      }
      getProductForOrder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, user]);

  useEffect(() => {
    setTotal(product?.price ?? 0);
  }, [product]);
  if (!user) {
    navigate(`/auth/login`);
  }
  if (!product) return null;

  const handleQuantityChange = (event) => {
    setTotal(parseFloat(product?.price ?? 0) * event.target.value);
    setQuantity(event.target.value);
  };

  const handleSaveOrder = async () => {
    if (!validateOrder()) return;

    const sessionId = Cookies.get(COOKIES_TYPE.SESSIONID);
    const visitorId = Cookies.get(COOKIES_TYPE.VISITORID);

    const productAttributeToSave = (({
      price: productPrice,
      uniq_id: productId,
      brand: productBrand,
      currency: productCurrency,
      title: productName,
      sub_cateory: productSubCategory,
      category: productCategory,
    }) => ({
      productId,
      productPrice,
      productBrand,
      productCurrency,
      productName,
      productSubCategory,
      productCategory,
    }))(product);

    const userAttributeToSave = (({
      id: userId,
      username,
      firstName: userFirstName,
      lastName: userLastName,
    }) => ({
      userId,
      username,
      userFirstName,
      userLastName,
    }))(user);

    const order = {
      sessionId,
      visitorId,
      createdDate: new Date(),
      orderTotal: total,
      ...productAttributeToSave,
      ...userAttributeToSave,
      productQuantity: quantity,
    };

    await saveOrderMutation.mutateAsync({ data: order });
    sendEvent(productAttributeToSave, EVENT_TYPE.ORDER);
  };

  function validateOrder() {
    if (!user) {
      navigate('/auth/login');
      return false;
    }

    if (!product) {
      navigate('/public/products');
      return false;
    }

    if (quantity <= 0) {
      useNotificationStore.getState().addNotification({
        type: 'error',
        title: 'Error',
        message: 'Quantity should be at least 1',
      });
    }
    return true;
  }

  return (
    <>
      <Head title="Order" />
      <ContentLayout title="Order">
        <div className="mt-6 flex flex-col space-y-16">
          <div className="py-5 ">
            <div className="mt-1 max-w-full text-sm text-gray-500">
              <div className="grid grid-cols-2 grid-rows-2 gap-4">
                <div className="col-span-1 bg-white shadow overflow-hidden p-4">
                  <h2 className="text-xl font-bold mb-4">Product Info</h2>
                  <hr />
                  <table className="table-fixed w-full mt-4">
                    <tbody>
                      <tr>
                        <td className="font-bold text-xl">Name</td>
                        <td className="text-lg">{product.title}</td>
                      </tr>
                      <tr>
                        <td className="font-bold text-xl">Price</td>
                        <td className="font-bold text-xl">
                          {product.currency} {product.price}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-bold text-xl">Brand</td>
                        <td className="text-lg">{product.brand}</td>
                      </tr>
                      <tr>
                        <td className="font-bold text-xl">Category</td>
                        <td className="text-lg">{product.category}</td>
                      </tr>

                      <tr>
                        <td className="font-bold text-xl">Sub-Category</td>
                        <td className="text-lg">
                          {product.sub_category ? product.sub_category : 'N/A'}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-bold text-xl">Condition</td>
                        <td className="text-lg italic">
                          {product.item_condition === 'NewCondition' ? 'New' : 'Used'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-span-1 bg-white shadow p-4">
                  <div className="flex justify-between">
                    <h2 className="text-xl font-bold mb-4">Order Info</h2>
                    <div>
                      <Link className="" to={`/app/orders`}>
                        <Button size="sm" variant="info" endIcon={<EyeIcon className="w-4 h-4" />}>
                          See Orders
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <hr />
                  <div className="grid grid-col h-72">
                    <table className="table-fixed w-full mt-4">
                      <tbody>
                        <tr>
                          <td className="font-bold text-xl">Quantity</td>
                          <td className="text-lg">
                            <input
                              onChange={handleQuantityChange}
                              value={quantity}
                              min={1}
                              type="number"
                              className="mb-4 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                          </td>
                        </tr>
                      </tbody>
                      <tfoot className="border-t-2">
                        <tr>
                          <td className="font-bold text-xl">Sub Total</td>
                          <td className="text-lg font-bold float-right">
                            {product.currency} {total.toFixed(2)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                    <div className="self-end  flex justify-between">
                      <Button
                        size="sm"
                        variant="inverse"
                        onClick={() => navigate(-1)}
                        endIcon={<ArrowCircleLeftIcon className="w-4 h-4" />}
                      >
                        Back
                      </Button>
                      <Button
                        size="sm"
                        isLoading={saveOrderMutation.isLoading}
                        onClick={handleSaveOrder}
                        type="button"
                        endIcon={<SaveIcon className="w-4 h-4" />}
                      >
                        Confirm Order
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentLayout>
    </>
  );
};
