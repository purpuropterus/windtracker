import json
from dataclasses import dataclass


@dataclass(frozen=True)
class Task:
    points: int
    first_time: int | None
    subsequent_time: int | None
    name: str
    is_blink_prone: bool = False
    is_extra_blink: bool = False


tasks = [
    Task(114, 3, 3, "Tennis", False),
    Task(13, 10, 3, "Target Practice (Tennis)", True),
    Task(26, 10, 3, "Putting", True),
    Task(27, 10, 3, "Hitting the Green", True),
    Task(1, None, None, "Extra blink", False, True),
]

TENNIS_BLINK_TIME = 1
OTHER_BLINK_TIME = 3


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

            total_blink_prone_tasks = sum(
                frequencies[j]
                for j, t in enumerate(tasks)
                if t.is_blink_prone
            )
            
            total_extra_blinks = sum(
                frequencies[j]
                for j, t in enumerate(tasks)
                if t.is_extra_blink
            )
            
            tennis_extra_blinks = min(4 * frequencies[0] + 3, total_extra_blinks)
            non_tennis_extra_blinks = total_extra_blinks - tennis_extra_blinks

            if (
                non_tennis_extra_blinks * ratio_den
                < total_blink_prone_tasks * ratio_num
            ):
                continue

            if task.is_extra_blink:
                tennis_frequency = frequencies[0]
                time = previous_time + (
                    TENNIS_BLINK_TIME
                    if frequencies[i] <= tennis_extra_blinks
                    else OTHER_BLINK_TIME
                )
            elif frequencies[i] == 1:
                time = previous_time + task.first_time
            else:
                time = previous_time + task.subsequent_time
                
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
        round(time),
        *frequencies
    ])


with open("advance.json", "w", encoding="utf-8") as f:
    json.dump(
        output,
        f,
        separators=(",", ":")
    )

