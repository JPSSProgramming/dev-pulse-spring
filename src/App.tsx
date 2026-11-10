import { useEffect, useState } from 'react'
import {
    Container,
    Typography,
    CircularProgress,
} from '@mui/material'

function App() {
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetch('/api/hello')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Backend request failed')
                }

                return response.text()
            })
            .then((data) => {
                setMessage(data)
            })
            .catch(() => {
                setError('Cannot connect to Backend')
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return (
        <Container sx={{ py: 8 }}>
            <Typography variant="h4" gutterBottom>
                DevPulse
            </Typography>

            {loading && <CircularProgress />}

            {error && (
                <Typography color="error">
                    {error}
                </Typography>
            )}

            {message && (
                <Typography color="success.main">
                    {message}
                </Typography>
            )}
        </Container>
    )
}

export default App