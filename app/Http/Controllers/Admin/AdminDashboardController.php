<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $thirtyDaysAgo = Carbon::now()->subDays(30);

        // Key Metrics: Revenue for TODAY only
        $totalRevenue = Order::where('status', 'reçu')
            ->whereDate('updated_at', Carbon::today())
            ->sum('total_amount');
            
        $totalOrders = Order::count();
        
        $totalProductsInStock = Product::sum('stock');

        // Sales over time (last 30 days) based on received date (updated_at)
        $salesData = Order::where('updated_at', '>=', $thirtyDaysAgo)
            ->where('status', 'reçu')
            ->select(DB::raw('DATE(updated_at) as date'), DB::raw('SUM(total_amount) as total'), DB::raw('COUNT(id) as orders_count'))
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

        // Fill in missing dates for the chart
        $chartData = [];
        for ($i = 30; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->format('Y-m-d');
            $dataForDate = $salesData->where('date', $date)->first();
            $chartData[] = [
                'date' => $date,
                'total' => (float) ($dataForDate->total ?? 0),
                'orders_count' => (int) ($dataForDate->orders_count ?? 0),
            ];
        }

        // Order Status Distribution
        $orderStatusData = Order::select('status', DB::raw('COUNT(*) as count'))
            ->groupBy('status')
            ->orderByDesc('count')
            ->get();

        // Recent Orders
        $recentOrders = Order::with('user')->latest()->take(5)->get();

        return Inertia::render('Admin/Dashboard', [
            'metrics' => [
                'revenue' => $totalRevenue,
                'orders' => $totalOrders,
                'stock' => $totalProductsInStock,
            ],
            'salesData' => $chartData,
            'orderStatusData' => $orderStatusData,
            'recentOrders' => $recentOrders,
        ]);
    }
}

