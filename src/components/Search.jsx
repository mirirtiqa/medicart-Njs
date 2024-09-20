import { useState } from 'react';

function MedicineSearch() {

    const searchMedicine = async (searchQuery) => {
        if (!searchQuery.trim()) {
          console.error('Search query cannot be empty');
          return;
        }
      
        try {
          const medicinesCollection = collection(db, 'medicines');
         
          const q = query(medicinesCollection, where('name', '==', searchQuery.trim()));
          
          const querySnapshot = await getDocs(q);
          const medicines = [];
          
          querySnapshot.forEach((doc) => {
            medicines.push({ id: doc.id, ...doc.data() });
          });
      
          return medicines.length > 0 ? medicines : 'No medicine found';
        } catch (error) {
          console.error('Error searching for medicine: ', error);
          return 'Error fetching medicine';
        }
      };
      
  const [searchQuery, setSearchQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    const searchResults = await searchMedicine(searchQuery);
    setResult(searchResults);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a medicine"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {result && (
        <div>
          {Array.isArray(result) ? (
            <ul>
              {result.map((medicine) => (
                <li key={medicine.id}>
                  {medicine.name}: {medicine.description}
                </li>
              ))}
            </ul>
          ) : (
            <p>{result}</p>
          )}
        </div>
      )}
    </div>
  );
}


