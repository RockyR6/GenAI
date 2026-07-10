# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).







## AppContext - Data Flow Architecture

AppContext manages global application state and handles server data extraction.

### Data Flow Path

1. **Server Request** → Component/Hook calls `fetchData()` or similar method
2. **API Call** → Request sent to backend endpoint
3. **Server Response** → Backend returns JSON data
4. **AppContext Update** → Response data processed and stored in context state
5. **Provider Wrapper** → `<AppProvider>` wraps components and provides context value
6. **Consumer Component** → Child components access data via `useContext(AppContext)` or custom hooks
7. **Render** → Components re-render with updated data

### How AppContext Works

```javascript
// Create Context
const AppContext = createContext();

// Provider Component
export function AppProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch from server
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result); // Store in context
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider value={{ data, loading, fetchData }}>
      {children}
    </AppContext.Provider>
  );
}

// Usage in components
function MyComponent() {
  const { data, loading, fetchData } = useContext(AppContext);
  
  useEffect(() => {
    fetchData(); // Extract data from server
  }, []);

  return <div>{loading ? 'Loading...' : data?.name}</div>;
}
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


