import React, { useEffect, useState } from 'react';

function LostFoundFilterHook({petStatus}) {

    const [pets, setPets] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const url = 'https://petfindr-api.herokuapp.com/pets/';

    useEffect(() => {
        getPetData();
        //eslint-disable-next-line
    }, [])

    function getPetData() {
        fetch(url)
            .then((res) => res.json())
            .then((json) => {
                setPets(json);

                if (petStatus.status === 'Found') {
                const filteredFound = json.filter((foundPet) =>
                    foundPet.status.includes('Found')
                );
                setFiltered(filteredFound);
                } else if (petStatus.status === 'Lost') {
                const filteredFound = json.filter((lostPet) =>
                    lostPet.status.includes('Lost')
                );
                setFiltered(filteredFound);
                } else if (petStatus.status === '') {
                setFiltered(json);
                }
            })
            .catch(console.error);
    } 
    return pets.status;
}
    

export default LostFoundFilterHook;