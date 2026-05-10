def ALBPS(processes, n):
    time = 0
    cpu_queues = [[] for _ in range(n)]
    completed = []
    ready_queue = []
    total_burst = sum(p["burst"] for p in processes)
    
    while len(completed) < len(processes):
        # Add newly arrived processes
        for p in processes:
            if p["arrival"] == time and p not in ready_queue and p not in completed:
                ready_queue.append(p)
        
        # Update dynamic priority (with aging)
        for p in ready_queue:
            p["wait"] = time - p["arrival"]
            p["dyn_priority"] = p["priority"] + p["wait"] / 5  # Aging factor = 5
        
        # Sort Ready Queue by dynamic priority (descending) then burst (ascending)
        ready_queue.sort(key=lambda x: (-x["dyn_priority"], x["burst"]))
        
        # Assign processes to CPUs with least load (if CPU idle)
        for cpu_id in range(n):
            if not cpu_queues[cpu_id] and ready_queue:
                cpu_queues[cpu_id].append(ready_queue.pop(0))
        
        # Run processes for one time unit
        for cpu_id in range(n):
            if cpu_queues[cpu_id]:
                p = cpu_queues[cpu_id][0]
                p["burst"] -= 1
                if p["burst"] <= 0:
                    completed.append(p)
                    cpu_queues[cpu_id].pop(0)
        
        time += 1
    
    # Calculate metrics
    return {
        "total_time": time,
        "cpu_utilization": (total_burst / (time * n)) * 100,
        "throughput": len(completed) / time
    }


# === User Input Section ===
processes = []
num_processes = int(input("Enter number of processes: "))
for i in range(num_processes):
    print(f"\n--- Process {i+1} ---")
    pid = input("Enter Process ID (e.g., P1): ")
    arrival = int(input("Enter Arrival Time: "))
    burst = int(input("Enter Burst Time: "))
    priority = int(input("Enter Base Priority (higher = more important): "))
    processes.append({"id": pid, "arrival": arrival, "burst": burst, "priority": priority})

n = int(input("\nEnter number of CPUs: "))

# Run ALBPS Algorithm
result = ALBPS(processes, n)

# === Results ===
print("\n=== ALBPS Scheduling Results ===")
print(f"Total Execution Time: {result['total_time']}")
print(f"CPU Utilization: {result['cpu_utilization']:.2f}%")
print(f"Throughput: {result['throughput']:.3f} processes/unit time")