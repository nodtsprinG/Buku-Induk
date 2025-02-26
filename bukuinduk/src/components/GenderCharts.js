import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const GenderCharts = () => {
  const [chartData, setChartData] = useState({
    totalSiswa: [0,0,0],
    siswaLaki: [0,0,0],
    siswaPerempuan: [0,0,0],
    tahunAngkatan: []
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [dashboardResponse, angkatanResponse] = await Promise.all([
        axios.get('http://localhost:8080/admin/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        axios.get('http://localhost:8080/admin/angkatan', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      const { count_laki, count_perempuan, count_siswa } = dashboardResponse.data;
      const tahunAngkatan = angkatanResponse.data;
      
      setChartData({
        totalSiswa: [count_siswa, count_siswa, count_siswa],
        siswaLaki: [count_laki, count_laki, count_laki],
        siswaPerempuan: [count_perempuan, count_perempuan, count_perempuan],
        tahunAngkatan: tahunAngkatan
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const commonOptions = {
    chart: {
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false
        },
        export: {
          csv: {
            filename: 'Data Siswa per Angkatan',
            columnDelimiter: ',',
            headerCategory: 'Tahun',
            headerValue: 'Jumlah'
          },
          svg: {
            filename: 'Data Siswa per Angkatan'
          },
          png: {
            filename: 'Data Siswa per Angkatan'
          }
        }
      }
    },
    colors: ['#2E93fA', '#000000', '#ff0a9d'], // Contoh warna: biru, hijau, oranye
    title: {
      style: {
        fontSize: '16px',
        fontWeight: 'bold'
      },
      align: 'center',
      margin: 10
    },
    xaxis: {
      categories: chartData.tahunAngkatan.map(angkatan => angkatan.tahun.toString()),
      labels: {
        style: { fontSize: '12px' }
      }
    },
    yaxis: {
      title: { text: 'Jumlah Siswa' },
      labels: {
        style: { fontSize: '12px' }
      }
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      offsetY: 5,
      itemMargin: { horizontal: 10 },
      fontSize: '12px'
    },
    grid: {
      borderColor: '#e0e0e0',
      strokeDashArray: 5
    },
    tooltip: {
      enabled: true,
      theme: 'light',
      style: { fontSize: '12px' }
    }
  };

  const chartSeries = [
    {
      name: 'Total Siswa',
      data: chartData.totalSiswa
    },
    {
      name: 'Siswa Laki-laki',
      data: chartData.siswaLaki
    },
    {
      name: 'Siswa Perempuan',
      data: chartData.siswaPerempuan
    }
  ];

  const barChartOptions = {
    ...commonOptions,
    chart: {
      ...commonOptions.chart,
      type: 'bar',
      height: 350
    },
    title: {
      ...commonOptions.title,
      text: 'Statistik Siswa per Angkatan'
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 3,
        dataLabels: {
          position: 'top'
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val;
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },
    fill: {
      opacity: 1
    }
  };

  const lineChartOptions = {
    ...commonOptions,
    chart: {
      ...commonOptions.chart,
      type: 'area',
      height: 350
    },
    title: {
      ...commonOptions.title,
      text: 'Tren Siswa per Angkatan'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100]
      }
    }
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
        <ReactApexChart 
          options={barChartOptions}
          series={chartSeries}
          type="bar"
          height={350}
          className="w-full"
        />
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
        <ReactApexChart 
          options={lineChartOptions}
          series={chartSeries}
          type="area"
          height={350}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default GenderCharts;