import { Grid, Paper, Text, Group } from '@mantine/core';

interface StatsProps {
  data: {
    total: number;
    by_status: {
      diverifikasi: number;
      diproses: number;
      dilaporkan: number;
    };
  };
}

export default function Stats({ data }: StatsProps) {
  const stats = [
    {
      title: 'Total Laporan',
      value: data.total,
      color: 'blue'
    },
    {
      title: 'Dilaporkan',
      value: data.by_status.dilaporkan,
      color: 'yellow'
    },
    {
      title: 'Diverifikasi',
      value: data.by_status.diverifikasi,
      color: 'green'
    },
    {
      title: 'Diproses',
      value: data.by_status.diproses,
      color: 'orange'
    }
  ];

  return (
    <Grid>
      {stats.map((stat) => (
        <Grid.Col key={stat.title} span={{ base: 12, sm: 6, md: 3 }}>
          <Paper shadow="sm" p="md" radius="md">
            <Group position="apart">
              <Text size="xs" color="dimmed" transform="uppercase" weight={700}>
                {stat.title}
              </Text>
            </Group>
            <Text size="xl" weight={700} color={stat.color}>
              {stat.value}
            </Text>
          </Paper>
        </Grid.Col>
      ))}
    </Grid>
  );
}
