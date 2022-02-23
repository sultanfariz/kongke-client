import { Box, Card, CardContent, CardMedia, CardActionArea, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export function RoomCard({ room }) {
  const router = useRouter();

  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '15px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          margin: '0',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <CardActionArea
          sx={{
            display: 'flex',
            flexDirection: 'row',
            margin: '0',
            justifyContent: 'flex-start',
            width: '100%',
          }}
          onClick={() => {
            router.push(`/rooms/${room.id}`);
          }}
        >
          <CardMedia
            component='img'
            alt={room?.name}
            sx={{
              // maxWidth: '130px',
              // maxHeight: '151px',
              maxWidth: '30%',
              height: '100%',
              marginBottom: 0,
            }}
            image={room?.image}
            title={room?.name}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <CardContent sx={{ padding: '5px 16px' }}>
              <Typography component='div' variant='h6'>
                <b>{room?.name}</b>
              </Typography>
              <p style={{ margin: '0 auto', fontSize: '11px' }}>by {room?.name}</p>
              <p style={{ textAlign: 'justify' }}>{room?.description}</p>
              {/* <Typography component='div' variant='caption' align='justify'>
                {room.summary}
              </Typography> */}
            </CardContent>
          </Box>
        </CardActionArea>
      </Box>
    </Card>
  );
}
