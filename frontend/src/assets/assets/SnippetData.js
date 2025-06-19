const snippets = [
  {
    id: '1',
    title: 'Async/Await Error Handling',
    description: 'Clean error handling pattern for async operations',
    code: `const fetchData = async () => {
  try {
    const response = await fetch('/api/data');
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

// Usage
fetchData()
  .then(data => console.log('Success:', data))
  .catch(error => console.log('Failed:', error));`,
    language: 'javascript',
    tags: ['async', 'error-handling', 'fetch'],
    createdAt: '2024-01-15',

    difficulty: 'intermediate',
  },
  {
    id: '2',
    title: 'React Custom Hook',
    description: 'Reusable hook for localStorage management',
    code: `import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
};

// Usage example
const MyComponent = () => {
  const [name, setName] = useLocalStorage('name', '');
  
  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter your name"
    />
  );
};`,
    language: 'react',
    tags: ['react', 'hooks', 'localStorage'],
    createdAt: '2024-01-14',

    difficulty: 'intermediate',
  },
  {
    id: '3',
    title: 'CSS Grid Auto-Fit Layout',
    description: 'Responsive grid layout without media queries',
    code: `.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.grid-item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 1.5rem;
  color: white;
  transition: transform 0.3s ease;
}

.grid-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

/* Responsive breakpoints handled automatically */
@media (max-width: 600px) {
  .grid-container {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }
}`,
    language: 'css',
    tags: ['css', 'grid', 'responsive'],
    createdAt: '2024-01-13',

    difficulty: 'beginner',
  },
  {
    id: '4',
    title: 'Python List Comprehension',
    description: 'Elegant data filtering and transformation',
    code: `# Filter and transform data in one line
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Traditional approach
result = []
for num in numbers:
    if num % 2 == 0:
        result.append(num ** 2)

# List comprehension
result = [num ** 2 for num in numbers if num % 2 == 0]
print(result)  # [4, 16, 36, 64, 100]

# Dictionary comprehension
word_lengths = {word: len(word) for word in ['python', 'javascript', 'rust']}
print(word_lengths)  # {'python': 6, 'javascript': 10, 'rust': 4}

# Set comprehension
unique_squares = {num ** 2 for num in numbers}
print(unique_squares)  # {1, 4, 9, 16, 25, 36, 49, 64, 81, 100}

# Nested comprehension
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [num for row in matrix for num in row]
print(flattened)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]`,
    language: 'python',
    tags: ['python', 'comprehension', 'functional'],
    createdAt: '2024-01-12',

    difficulty: 'intermediate',
  },
  {
    id: '5',
    title: 'Debounce Function',
    description: 'Optimize performance by limiting function calls',
    code: `const debounce = (func, delay) => {
  let timeoutId;
  
  return function (...args) {
    const context = this;
    
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
};

// Usage example
const searchInput = document.getElementById('search');
const debouncedSearch = debounce((event) => {
  console.log('Searching for:', event.target.value);
  // Perform search operation
  performSearch(event.target.value);
}, 300);

searchInput.addEventListener('input', debouncedSearch);

// Advanced debounce with immediate execution option
const advancedDebounce = (func, delay, immediate = false) => {
  let timeoutId;
  
  return function (...args) {
    const context = this;
    const callNow = immediate && !timeoutId;
    
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (!immediate) func.apply(context, args);
    }, delay);
    
    if (callNow) func.apply(context, args);
  };
};`,
    language: 'javascript',
    tags: ['javascript', 'performance', 'debounce'],
    createdAt: '2024-01-11',

    difficulty: 'advanced',
  },
  {
    id: '6',
    title: 'Flexbox Centering',
    description: 'Perfect centering with flexbox',
    code: `.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.center-both {
  display: flex;
  justify-content: center;
  align-items: center;
}

.center-horizontal {
  display: flex;
  justify-content: center;
}

.center-vertical {
  display: flex;
  align-items: center;
}

/* Alternative centering methods */
.grid-center {
  display: grid;
  place-items: center;
  min-height: 100vh;
}

.absolute-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.margin-center {
  margin: 0 auto;
  width: fit-content;
}`,
    language: 'css',
    tags: ['css', 'flexbox', 'centering'],
    createdAt: '2024-01-10',

    difficulty: 'beginner',
  },
  {
    id: '7',
    title: 'TypeScript Generic Utility',
    description: 'Type-safe object property picker utility',
    code: `// Generic utility to pick specific properties from an object
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Usage example
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Pick only safe properties for API response
type PublicUser = Pick<User, 'id' | 'name' | 'email'>;

const createPublicUser = (user: User): PublicUser => {
  return {
    id: user.id,
    name: user.name,
    email: user.email
  };
};

// Advanced generic utility
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Function with generic constraints
function updateUser<T extends Partial<User>>(
  id: number, 
  updates: T
): Promise<User & T> {
  // Implementation would update user in database
  return Promise.resolve({} as User & T);
}`,
    language: 'typescript',
    tags: ['typescript', 'generics', 'utility-types'],
    createdAt: '2024-01-09',
    difficulty: 'advanced',
  },
];

export default snippets;
