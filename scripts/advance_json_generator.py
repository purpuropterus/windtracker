import json
from dataclasses import dataclass


@dataclass(frozen=True)
class Task:
    points: int
    time: int
    name: str
    is_extra: bool = False


tasks = [
    Task(237, 10, "Picking Up Spares"),
    Task(170, 10, "Power Throws"),
    Task(12, 10, "Target Practice (Tennis)"),
    Task(25, 10, "Putting"),
    Task(26, 10, "Hitting the Green"),
    Task(31, 10, "Target Practice (Golf)"),
    Task(1, 3, "Extra blink", True),
]


def find_shortest(n, ratio_num=1, ratio_den=4):

    dp = [None] * (n + 1)

    dp[0] = (0, [0] * len(tasks))

    for points in range(1, n + 1):

        best = None

        for i, task in enumerate(tasks):

            if points < task.points:
                continue

            previous = dp[points - task.points]

            if previous is None:
                continue

            previous_time, previous_freq = previous

            frequencies = previous_freq.copy()
            frequencies[i] += 1

            total_tasks = sum(frequencies)
            extra_tasks = frequencies[-1]

            if (
                extra_tasks * ratio_den
                < total_tasks * ratio_num
            ):
                continue

            time = previous_time + task.time

            if best is None or time < best[0]:
                best = (time, frequencies)

        dp[points] = best

    return dp


N = 5000

results = find_shortest(
    N,
    ratio_num=1,
    ratio_den=4,
)


output = {
    "tasks": [task.name for task in tasks],
    "solutions": []
}


for points in range(1, N + 1):

    result = results[points]

    if result is None:
        output["solutions"].append(None)
        continue

    time, frequencies = result

    output["solutions"].append([
        time,
        *frequencies
    ])


with open("advance.json", "w", encoding="utf-8") as f:
    json.dump(
        output,
        f,
        separators=(",", ":")
    )

