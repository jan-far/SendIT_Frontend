import React, { useContext } from 'react';
import UserNav from '../../../../Components/UserNav';
import { AdminContext } from '../../../../Contexts/Admin';
import withSpinner from '../../../../Components/withSpinner';
import { AdminContainer, Column1, Column2 } from './DashboardElement';
import UpdateParcel from './form';
import { update_parcel } from '../../../../Services/utils/fetch';
import NotificationToast from '../../../../Components/Toast';
import AllUsersParcel from './AllUsersParcel';
import ParcelChart from './ParcelChart';

const AdminDashboard = () => {
  const {
    Row,
    isLoading,
    setLoading,
    editing,
    setEditing,
    closeEdit,
    isOpen,
    toggle,
    selectedParcel,
    setSelectedParcel,
  } = useContext(AdminContext);

  const handleEdit = (id) => {
    setEditing(!editing);
    const editRow = Row.find((row) => row.id === id);
    return setSelectedParcel({ ...editRow });
  };

  const submitEdit = async (data) => {
    setLoading(true);
    const id = selectedParcel.id;
    const update = { ...selectedParcel, ...data };
    const parcelToUpdate = Row.findIndex((row) => row.id === id);

    if (
      data.status !== selectedParcel.status ||
      data.location !== selectedParcel.location
    ) {
      if (data.status !== selectedParcel.status) {
        try {
          const req = await update_parcel(data, `/parcels/${id}/status`);
          const response = await req.json();

          if (response === undefined || req.status !== 200) {
            NotificationToast.error(`${response.message}`);
            setLoading(false);
          } else {
            NotificationToast.success(`${response.message}`);
            Row.splice(parcelToUpdate, 1, update);
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
        }
      }

      if (data.location !== selectedParcel.location) {
        try {
          const req = await update_parcel(
            data,
            `/parcels/${id}/presentLocation`
          );
          const response = await req.json();

          if (response === undefined || req.status !== 200) {
            NotificationToast.error(`${response.message}`);
            setLoading(false);
          } else {
            NotificationToast.success(`${response.message}`);
            Row.splice(parcelToUpdate, 1, update);
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      NotificationToast.success(`:smile`);
      setLoading(false);
    }
  };

  const confrimParcel = async (id) => {
    setLoading(true);
    const parcelToConfirm = Row.find((row) => row.id === id);
    const data = { ...parcelToConfirm, status: 'delivered' };

    const ask = window.confirm('Are you sure parcel has been delivered?');

    console.log(parcelToConfirm);

    if (ask) {
      try {
        const req = await update_parcel(data, `/parcels/${id}/status`);
        const response = await req.json();

        if (response === undefined || req.status !== 200) {
          NotificationToast.error(`${response.message}`);
          setLoading(false);
        } else {
          NotificationToast.success(`${response.message}`);
          Row.splice(parcelToConfirm, 1, data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setLoading(false);
    }
  };

  const ParcelChartWithSpinner = withSpinner(ParcelChart);

  return (
    <>
      <UserNav title="Admin Portal" isOpen={isOpen} toggle={toggle} />
      <UpdateParcel
        data={selectedParcel}
        editing={editing}
        closeEdit={closeEdit}
        submitEdit={submitEdit}
      />
      <AdminContainer>
        <Column1>
          {/* <Typography varient="caption">Total Order: {Row.length}</Typography> */}
          <ParcelChartWithSpinner isLoading={isLoading} />
        </Column1>
        <Column2>
          <AllUsersParcel edit={handleEdit} confrimParcel={confrimParcel} />
        </Column2>
      </AdminContainer>
    </>
  );
};

export default AdminDashboard;
