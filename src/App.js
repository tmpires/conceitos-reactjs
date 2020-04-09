import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Novo repositorio ${new Date()}`,
      url: 'https://github.com/tmpires',
      techs: ['ReactJs', 'React Native', 'Node.js']
    });

    setRepositories([...repositories, response.data ]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const repoIndex = repositories.findIndex(repo => repo.id === id);
    const aux = repositories;
    aux.splice(repoIndex, 1);
    setRepositories([...aux]);
  }

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
