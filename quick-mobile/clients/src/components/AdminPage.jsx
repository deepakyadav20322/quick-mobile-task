import React, { useEffect, useState } from 'react';
import { useRef } from 'react';

const AdminPage = () => {
  const backendBaseURL = 'http://localhost:8080';

  const [tab, setTab] = useState('services');
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
const serviceFileInputRef = useRef(null);
const productFileInputRef = useRef(null);


const [serviceForm, setServiceForm] = useState({ serviceName: '', servicePic: null, id: '' });

  const [productForm, setProductForm] = useState({
    name: '', variant: '', rating: '', reviews: '', price: '', oldPrice: '', image: null, id: ''
  });

  // Fetch services and products once
useEffect(() => {
  const fetchData = async () => {
    const [servicesRes, productsRes] = await Promise.all([
      fetch(`${backendBaseURL}/api/service`).then(res => res.json()),
      fetch(`${backendBaseURL}/api/product`).then(res => res.json())
    ]);

    console.log("Fetched services:", servicesRes);  // <== add this
    console.log("Fetched products:", productsRes);  // <== and this

    setServices(servicesRes?.data);
    setProducts(productsRes?.products);
  };
  fetchData();
}, []);


  // Utility for image uploading
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'image_preset'); // 🔁 Replace with your actual preset
  formData.append('cloud_name', 'dtylrk1zj');       // 🔁 Replace with your actual cloud name

  const res = await fetch('https://api.cloudinary.com/v1_1/dtylrk1zj/image/upload', {
    method: 'POST',
    body: formData
  });

  const data = await res.json();
  return data.secure_url; // ✅ Return uploaded image URL
};


  // Generic submit handler
const handleSubmit = async (type, formData, setFormData, setData, endpoint) => {
  setLoading(true);  // Set loading to true when submission starts
  const { id, ...rest } = formData;
  const updatedData = { ...rest };

  // Upload image if it's a File
  if (updatedData.image instanceof File) {
   const im = await uploadImage(updatedData.image);
    updatedData.image = im
    console.log("image aaya hai...",im)
  }
  if (updatedData.servicePic instanceof File) {
    updatedData.servicePic = await uploadImage(updatedData.servicePic);
  }

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${backendBaseURL}/api/${endpoint}/${id}` : `${backendBaseURL}/api/${endpoint}`;

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...updatedData, id }),
  });

  console.log(await res.json()); // Log response for debugging

  // Reset form after submission
  setFormData(type === 'service'
    ? { serviceName: '', servicePic: null, id: '' }
    : { name: '', variant: '', rating: '', reviews: '', price: '', oldPrice: '', image: null, id: '' }
  );
  if (type === 'service' && serviceFileInputRef.current) {
  serviceFileInputRef.current.value = '';
}
if (type === 'product' && productFileInputRef.current) {
  productFileInputRef.current.value = '';
}


  // Fetch updated data
  const updated = await fetch(`${backendBaseURL}/api/${endpoint}`).then(res => res.json());
  setData(updated.data || updated.products || []);

  setLoading(false); // Set loading to false once the process is complete
};


  const deleteItem = async (type, id) => {
    const endpoint = type === 'service' ? 'service' : 'product';
    await fetch(`${backendBaseURL}/api/${endpoint}/${id}`, { method: 'DELETE' });
    const updated = await fetch(`${backendBaseURL}/api/${endpoint}`).then(res => res.json());
    type === 'service' ? setServices(updated?.data) : setProducts(updated?.products);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <button onClick={() => setTab('services')} className={`block w-full text-left py-2 px-4 rounded mb-2 ${tab === 'services' ? 'bg-gray-200' : ''}`}>
          Manage Services
        </button>
        <button onClick={() => setTab('products')} className={`block w-full text-left py-2 px-4 rounded ${tab === 'products' ? 'bg-gray-200' : ''}`}>
          Manage Products
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {tab === 'services' && (
          <>
            <h2 className="text-xl font-semibold mb-4">Services</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSubmit('service', serviceForm, setServiceForm, setServices, 'service');
            }} className="bg-white p-4 rounded shadow mb-6 flex flex-col md:flex-row gap-4">
       
            <input
  type="text"
  placeholder="Service Name"
  className="border p-2 flex-1"
  value={serviceForm.serviceName}
  onChange={(e) => setServiceForm({ ...serviceForm, serviceName: e.target.value })}
  required
/>

<input
  type="file"
    ref={serviceFileInputRef}
  className="border p-2 flex-1"
  onChange={(e) => setServiceForm({ ...serviceForm, servicePic: e.target.files[0] })}
  required
/>

<button className="bg-black text-white px-4 py-2 rounded" disabled={loading}>
  {loading ? (
    <div className="loader"></div>  // Add the spinner here
  ) : (
    serviceForm.id ? 'Update' : 'Add'
  )}
</button>


            </form>

            <table className="w-full bg-white shadow rounded">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 text-left">Label</th>
                  <th className="p-2 text-left">Image</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services && services?.map((s) => (
                  <tr key={s._id} className="border-b">
                    <td className="p-2">{s.serviceName}</td>
                    <td className="p-2"><img src={s.servicePic} alt="img" className="w-16 h-10 object-cover" /></td>
                    <td className="p-2 flex gap-2">
                       <button className='cursor-pointer text-green-500 pr-2' onClick={() => setServiceForm({ ...s, id: s._id })}>Edit</button>
  <button className='cursor-pointer text-red-500' onClick={() => deleteItem('service', s._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {tab === 'products' && (
          <>
            <h2 className="text-xl font-semibold mb-4">Top Selling Products</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSubmit('product', productForm, setProductForm, setProducts, 'product');
            }} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 md:grid-cols-3 gap-4">
              {['name', 'variant', 'rating', 'reviews', 'price', 'oldPrice'].map((key) => (
                <input key={key} type="text" placeholder={key} className="border p-2"
                  value={productForm[key]} onChange={(e) => setProductForm({ ...productForm, [key]: e.target.value })} required />
              ))}
              <input type="file" className="border p-2 col-span-full"
               ref={productFileInputRef}
                onChange={(e) => setProductForm({ ...productForm, image: e.target.files[0] })} required />
              <button className="col-span-full bg-black text-white px-4 py-2 rounded">{productForm.id ? 'Update' : 'Add'}</button>
            </form>

            <table className="w-full bg-white shadow rounded">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Variant</th>
                  <th className="p-2">Rating</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Image</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products && products?.map((p) => (
                  <tr key={p._id} className="border-b">
                    <td className="p-2">{p.name}</td>
                    <td className="p-2">{p.variant}</td>
                    <td className="p-2">{p.rating}⭐</td>
                    <td className="p-2">₹{p.price}</td>
                    <td className="p-2"><img src={p.image} alt="img" className="w-16 h-10 object-cover" /></td>
                    <td className="p-2 flex gap-2">
                      {/* <button className="text-blue-600" onClick={() => setProductForm(p)}>Edit</button> */}
                      <button className="text-red-600" onClick={() => deleteItem('product', p._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
